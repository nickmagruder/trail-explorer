'use strict';

const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 9999;

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.error(error));

const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;

app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', getIndexpage);
app.post('/home', createProfile);
app.post('/home/existing', getProfile);
app.get('/home/:username', getHomepage);
// app.post('/create_profile', createProfile);
app.post('/profile:id', getProfile);
app.delete('/profile/delete', deleteTrail);
app.put('/profile/update', updateTrail);
app.get('/search', getSearches);
app.get('/search/save', saveTrail);

app.get('/profile', generateProfilePage);
app.get('/about_us/:username', getAboutUs);

app.delete('/delete', deleteTrail);



function getIndexpage(req, res) {
  res.render('index.ejs');
  //modal box for sign in or create new profile
  //render new homepage with customized name and options
}

function getHomepage(req, res) {
  res.render('pages/home.ejs', { userInfo: req.params});
  //modal box for sign in or create new profile
  //render new homepage with customized name and options
}

function getAboutUs(req, res) {
  res.render('pages/about_us.ejs', { userInfo: req.params});
}

function createProfile(req, res) {
  const user = req.body;
  client.query(`SELECT * FROM userID WHERE username = '${user.username}'`)
    .then(results => {

      if(!results.rows[0]){
        const sqlArray = [user.username, user.city, user.us_state, 0];

        const sql = 'INSERT INTO userID (username, city, us_state, miles_hiked) VALUES ($1, $2, $3, $4) RETURNING *';
        client.query(sql, sqlArray);
        res.render('pages/home.ejs', { userInfo: user });
      } else {
        res.redirect('/');
      }
    });
}

function getProfile(req, res) {
  const user = req.body;
  console.log(user);
  client.query(`SELECT * FROM userID WHERE username = '${user.username}'`)
    .then(results => {
      if(!results.rows[0]){
        res.redirect('/');
      } else{
        const userInfo = results.rows[0];
        res.render('pages/home.ejs', {userInfo: userInfo});
      }
    });
}

function saveTrail(req, res) {
  //save trail to sql database for user profile
  //repopulate search page
  const username = 1;
  // const trail = req.body;
  const trail = require('./data/trails.json');

  const sqlArray = [username, trail[0].latitude, trail[0].longitude, trail[0].name, trail[0].summary, trail[0].difficulty, trail[0].stars, trail[0].ascent, trail[0].length, trail[0].imgMedium, trail[0].url];
  const sql = 'INSERT INTO favorite (username, lat, lon, trail, summary, difficulty, rating, elevation, distance, img_url, trail_url ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
  client.query(sql, sqlArray);
  res.redirect('/search');
}

function deleteTrail(req, res) {
  //delete trail from favorites
}

function updateTrail(req, res) {
  //update trail information
}



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
      res.render('pages/results.ejs', { trails: TrailData, userInfo: queryUser });
    })
    .catch(error => {
      res.status(500).send('Sorry, an error has occured');
      console.log(error, '500 Error');
    });
}

function generateProfilePage(req, res) {
  const ProfileUsername = 'iamnotatgregs';
  client.query(`SELECT * FROM userID WHERE username = '${ProfileUsername}'`)
    .then(result => {
      const foreignIDname = result.rows[0].id;
      client.query(`SELECT * FROM favorite WHERE username = '${foreignIDname}'`)
        .then(result => {
          let savedTrails = result.rows;
          res.render('pages/profile.ejs', { savedTrails: savedTrails, userInfo: foreignIDname });
        });
    });
}

function deleteTrail(req, res) {
  return client.query('DELETE FROM favorite WHERE id=$1', [req.body.id])
  .then(() => res.redirect('/profile'));
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
  /*   this.conditions = trailObject.conditionDetails;
    this.condition_date = trailObject.conditionDate.slice(0, 10);
    this.condition_time = trailObject.conditionDate.slice(11); */
}


app.use('*', (req, res) => res.status(404).send('Route you are looking for cannot be found'));
client.connect().then(() => {
  app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
});


