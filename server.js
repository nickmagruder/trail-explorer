'use strict';

const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 9999;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));

app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Paths
app.get('/', getIndexpage);
app.post('/home', createProfile);
app.post('/home/existing', getProfile);
app.get('/home/:username', getHomepage);
app.get('/search', getSearches);
app.post('/search/save', saveTrail);
app.get('/favorites/:username', generateFavoritesPage);
app.get('/about_us/:username', getAboutUs);
app.get('/profile/:username', getProfilePage);
app.get('/completed/:username', getCompletedPage);
app.delete('/delete', deleteTrail);
app.post('/edit', editSave);

//Path callback functions

//Landing page rendering
function getIndexpage(req, res) {
  res.render('index.ejs', { userExists: 'start' });
}

//Homepage rendering
function getHomepage(req, res) {
  res.render('pages/home.ejs', { userInfo: req.params });
}

//About us page rendering
function getAboutUs(req, res) {
  res.render('pages/about_us.ejs', { userInfo: req.params });
}

//Profile creation
function createProfile(req, res) {
  const user = req.body;
  client.query(`SELECT * FROM userID WHERE username = '${user.username}'`)
    .then(results => {

      if (!results.rows[0]) {
        const sqlArray = [user.username, user.city, user.us_state, 0];

        const sql = 'INSERT INTO userID (username, city, us_state, miles_hiked) VALUES ($1, $2, $3, $4) RETURNING *';
        client.query(sql, sqlArray);
        res.render('pages/home.ejs', { userInfo: user });
      } else {
        res.render('index.ejs', { userExists: 'true' });
      }
    });
}

//Existing profile login
function getProfile(req, res) {
  const user = req.body;
  client.query(`SELECT * FROM userID WHERE username = '${user.username}'`)
    .then(results => {
      if (!results.rows[0]) {
        res.render('index.ejs', { userExists: 'false' });
      } else {
        const userInfo = results.rows[0];
        res.render('pages/home.ejs', { userInfo: userInfo });
      }
    });
}

//Saving trail from search to user favorites
function saveTrail(req, res) {
  const trail = req.body;
  const location = req.body.location;
  const ProfileUsername = trail.username;
  client.query(`SELECT * FROM userID WHERE username = '${ProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      client.query(`SELECT * FROM favorite WHERE username = '${foreignIDname}' AND trail = '${trail.trail_name}'`)
        .then(result => {
          if(result.rowCount === 0){
            const sqlArray = [foreignIDname, trail.lat, trail.lon, trail.trail_name, trail.city, trail.summary, trail.difficulty, trail.rating, trail.elevation || 0, trail.distance, trail.img_url, trail.trail_url];
            const sql = 'INSERT INTO favorite (username, lat, lon, trail, city, summary, difficulty, rating, elevation, distance, img_url, trail_url ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
            client.query(sql, sqlArray);
            res.redirect(`/search?location=${location}&userInfo=${ProfileUsername}`);
          }else{
            res.redirect(`/search?location=${location}&userInfo=${ProfileUsername}`);
          }
        });
    });
}

//Search result rendering
function getSearches(req, res) {
  const query = req.query.location;
  const queryUser = req.query.userInfo;
  superagent.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${query}&format=json`)
    .then(result => {
      const location = new LocationConstructor(result.body[0], query);
      const lat = location.latitude;
      const long = location.longitude;
      const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
      const urlTrails = `http://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=100&key=${TRAIL_API_KEY}&maxResults=10`;
      return superagent.get(urlTrails);
    })
    .then(trailEntry => {
      let trailsArray = trailEntry.body.trails;
      let TrailData = trailsArray.map(trail => {
        return new TrailConstructor(trail);
      });
      res.render('pages/results.ejs', { trails: TrailData, userInfo: queryUser, location: query });
    })
    .catch(error => {
      res.status(500).send('Sorry, an error has occured');
      console.log(error, '500 Error');
    });
}

//Favorite hikes page rendering
function generateFavoritesPage(req, res) {
  const ProfileUsername = req.params.username;
  client.query(`SELECT * FROM userID WHERE username = '${ProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      client.query(`SELECT * FROM favorite WHERE username = '${foreignIDname}'`)
        .then(result => {
          let savedTrails = result.rows;
          res.render('pages/favorites.ejs', { savedTrails: savedTrails, userInfo: ProfileUsername });
        });
    });
}

//Deleting trail from favorites
function deleteTrail(req, res) {
  const deleteRouteUsername = req.body.username;
  return client.query('DELETE FROM favorite WHERE id=$1', [req.body.id])
    .then(() => res.redirect(`/favorites/${deleteRouteUsername}`));
}

//Completed hike functionality
function editSave(req, res) {
  const notesEdit = req.body.notes || '';
  const completed = req.body.completed;
  const d = new Date();
  const backupDate = d.toISOString().split('T')[0];
  const dateCompleted = req.body.date_completed || backupDate;
  const editProfileUsername = req.body.username;
  const trailName = req.body.trail_name;
  client.query(`SELECT * FROM userID WHERE username = '${editProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      const editArray = [notesEdit, completed, dateCompleted];
      const editSQL = `UPDATE favorite SET notes='${editArray[0]}', completed='${editArray[1]}', date_completed='${editArray[2]}' WHERE username='${foreignIDname}' AND trail='${trailName}'`;
      client.query(editSQL);
      res.redirect(`/favorites/${editProfileUsername}`);
    });
}

//Profile page rendering
function getProfilePage(req, res) {
  const ProfileUsername = req.params.username;
  client.query(`SELECT * FROM userID WHERE username = '${ProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      client.query(`SELECT * FROM favorite WHERE username = '${foreignIDname}' AND completed = 'completed'`)
        .then(result => {
          const completedHikes = result.rowCount;
          let milesHiked = 0;
          result.rows.forEach(trail => {
            return milesHiked+=Number(trail.distance);
          });
          let averageMiles = milesHiked/completedHikes;
          if(completedHikes < 1){
            averageMiles = 0;
          }
          res.render('pages/profile1.ejs', { completedHikes: completedHikes, userInfo: req.params, milesHiked: milesHiked.toFixed(2), averageMiles: averageMiles.toFixed(2) });
        });
    });
}

//Completed hikes page rendering
function getCompletedPage(req, res){
  const ProfileUsername = req.params.username;
  client.query(`SELECT * FROM userID WHERE username = '${ProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      client.query(`SELECT * FROM favorite WHERE username = '${foreignIDname}' and completed ='completed'`)
        .then(result => {
          let savedTrails = result.rows;
          res.render('pages/completed.ejs', { savedTrails: savedTrails, userInfo: ProfileUsername });
        });
    });
}




// Constructors

function LocationConstructor(locationObject, reqCity) {
  this.search_query = reqCity;
  this.formatted_query = locationObject.display_name;
  this.latitude = locationObject.lat;
  this.longitude = locationObject.lon;
}


function TrailConstructor(trailObject) {
  this.trailID = trailObject.id;
  this.lat = trailObject.latitude;
  this.lon = trailObject.longitude;
  this.trail = trailObject.name;
  this.city = trailObject.location;
  this.summary = trailObject.summary;
  this.distance = trailObject.length;
  this.rating = trailObject.stars;
  this.elevation = trailObject.ascent;
  this.difficulty = trailObject.difficulty;
  this.trail_url = trailObject.url;
  this.img_url = trailObject.imgMedium;
}


app.use('*', (req, res) => res.status(404).send('Route you are looking for cannot be found'));
client.connect().then(() => {
  app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
});


