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

app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', getHomepage);
app.get('/home');
app.get('/create_profile', createProfile);
app.post('/profile:id', getProfile);
app.delete('/profile/delete', deleteTrail);
app.put('/profile/update', updateTrail);
app.get('/search', getSearches);
app.get('/search/save', saveTrail);

function getHomepage(req, res){
  const emptyName = 'Bob';
  res.render('index.ejs', {user: emptyName});
  //modal box for sign in or create new profile
  //render new homepage with customized name and options
}

function createProfile(req, res){
  const username = require('./data/user.json');
  // const instanceOfUsername = new User (username);

  const sqlArray = [username[0].username, username[0].city, username[0].us_state, username[0].miles_hiked];
  const sql = 'INSERT INTO userID (username, city, us_state, miles_hiked) VALUES ($1, $2, $3, $4) RETURNING *';
  client.query(sql, sqlArray);
  res.redirect(`/${username[0].username}`);

// -- 1. change users and trails from .sql to .json
// -- 2. require them in to server
// -- 3. in user call change data type to json
// -- 4.
}

function getProfile(req, res){
  //select profile link on menu or homepage
  //populate profile page based on login
}

function saveTrail(req, res){
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

function deleteTrail(req, res){
  //delete trail from favorites
}

function updateTrail(req, res){
  //update trail information
}




// Seattle lat-long: 47.6038, -122.3300
function getSearches(req, res){
  //Offer ability to input new location

  /*  const lat = req.query.latitude;
    const long = req.query.longitude; */

    const lat = 47.6038
    const long = -122.3300
    const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
    // console.log(TRAIL_API_KEY);
    const urlTrails = `http://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=100&key=${TRAIL_API_KEY}&maxResults=10`;

    return superagent.get(urlTrails)
        .then(trailEntry => {
            let trailsArray = trailEntry.body.trails;
            let TrailData = trailsArray.map(trail => {
                return new TrailConstructor(trail);
            })
            res.send(TrailData);
            // console.log(TrailData);
        })
        .catch(error => {
            res.status(500).send('Sorry, an error has occured');
            console.log(error, '500 Error')
        });
};



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


