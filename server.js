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
app.post('/search', getSearches);
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

function getSearches(req, res){
  //start by using default location of profile to render trails by calling api
  //Offer ability to input new location
}




app.use('*', (req, res) => res.status(404).send('Route you are looking for cannot be found'));
client.connect().then(() => {
  app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
});


