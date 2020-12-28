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
app.post('/profile:id', getProfile);
app.delete('/profile/delete', deleteTrail);
app.put('/profile/update', updateTrail);
app.get('/search', getSearches);
app.post('/search/save', saveTrail);

function getHomepage(req, res){
  res.send('index.ejs');
  //modal box for sign in or create new profile
  //render new homepage with customized name and options
}

function getProfile(req, res){
  //select profile link on menu or homepage
  //populate profile page based on login
}

function saveTrail(req, res){
  //save trail to sql database for user profile
  //repopulate search page
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
    console.log(TRAIL_API_KEY);
    const urlTrails = `http://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=100&key=${TRAIL_API_KEY}&maxResults=10`;

    return superagent.get(urlTrails)
        .then(trailEntry => {
            let trailsArray = trailEntry.body.trails;
            let TrailData = trailsArray.map(trail => {
                return new TrailConstructor(trail);
            })
            res.send(TrailData);
            console.log(TrailData);
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

// Copy of the schema:
/* CREATE TABLE favorite(
  ID SERIAL PRIMARY KEY,
  username FOREIGN KEY,
  completed VARCHAR(255),
  date_completed DATE,
  lat NUMBER,
  lon NUMBER,
  trail VARCHAR(255),
  city VARCHAR(255),
  summary TEXT,
  distance NUMBER,
  rating NUMBER,
  elevation NUMBER,
  difficulty VARCHAR(255),
  trail_url VARCHAR(255),
  img_url VARCHAR(255),
  notes VARCHAR(255)
); */


// NICKTODO: user constructor


app.use('*', (req, res) => res.status(404).send('Route you are looking for cannot be found'));
client.connect().then(() => {
  app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
});


