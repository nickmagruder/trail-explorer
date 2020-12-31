# Trail Explorer

## Authors:
* William Moreno
* Nick Magruder
* James Gerstenberger

**Version**: 1.0.17

## Overview
An application to find and save hikes that can also be used to tally total miles hiked and track progress. This will allow for personal growth by monitoring physical activity and time in nature. The application will allow you to provide yourown description and rating of each hike in addition to crowd-sourced ratings and descriptions.

## Getting Started
To get this application running on a computer a user must download the repository and use npm to install the dependencies. They must also create a .env file that contains a LocationIQ API key and Hiking Project API key. Lastly, a user must set up a postgres database and corresponding tables to match those in the schema.sql file located in the data folder.

## User Instructions
To use this application, a user must first create a profile by entering a username,the city and state they are located in. If the user already has a profile they can utilize that to login. The user will then be taken to a landing page where they can search for new trails or visit their profile page. If the user inputs a search query they will be directed to a results page where they can see trails in the search location and will be able to add them to their favorite trails on their profile page. On the profile page the user will be able to view their favorite trails and add notes or list a trail as completed. The profile page will also show the user how many miles they have hiked based on their completed hikes.

## Libraries, Frameworks & Packages
  dotenv: "^8.2.0",
  ejs: "^3.1.5",
  express: "^4.17.1",
  method-override: "^3.0.0",
  pg: "^8.5.1",
  superagent": "^6.1.0"
  Jquery

## Design
CSS design follows SMACSS protocol and includes reset,base, layout, and modules css files.

## API Endpoints
Hiking Project: http://www.hikingproject.com/data/get-trails?
Location IQ: https://us1.locationiq.com/v1/search.php?

## Database Schema
  TABLE userID
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  city VARCHAR(255),
  us_state VARCHAR(255),
  miles_hiked DECIMAL

  TABLE favorite
  ID SERIAL PRIMARY KEY,
  username INT,
  FOREIGN KEY (username) REFERENCES userID(ID),
  completed VARCHAR(255),
  date_completed DATE,
  lat DECIMAL,
  lon DECIMAL,
  trail VARCHAR(255),
  city VARCHAR(255),
  summary TEXT,
  distance DECIMAL,
  rating DECIMAL,
  elevation DECIMAL,
  difficulty VARCHAR(255),
  trail_url VARCHAR(255),
  img_url VARCHAR(255),
  notes VARCHAR(255)

## Change Log
12-28-2020 11:00am - Initial server build out
12-28-2020 11:00am - SQL table build out
12-28-2020 11:00am - API call and constructor functions built
12-28-2020 2:00pm - Public folder structure build out; css, and js
12-28-2020 2:00pm  - Partials created for header, footer and nav
12-28-2020 5:00pm  - PostgreSQL database setup and tables connected
12-28-2020 5:00pm - Homepage setup and modal search box created
12-29-2020 11:00am - README update and profile login functionality changed
12-29-2020 11:00am - Results page rendering functionality developed
12-29-2020 2:00pm - Search form connected to results rendering
12-29-2020 2:00pm - Detail modals for trail cards developed
12-29-2020 5:00pm - Saving favorite trails connected to database
12-29-2020 5:00pm - Landing page built and README updated
12-30-2020 11:00am - Profile login modal updated
12-30-2020 11:00am - Deletion and updating of favorite/completed trail functionality built
12-30-2020 11:00am - About us page created
12-30-2020 2:00pm - Created individual profile page
12-30-2020 2:00pm - Favorite page and Completed hikes pages finalized

## Credits and Collaborations
Codefellows Teacher Nicholas Carignan
Codefellows TA's Brai, Chance, and Bade
Codefellows .eslintrc.json and .gitignore frameworks
W3Schools
Unsplash
Font Awesome
Medium
Heroku
Miro
LocationIQ
The Hiking Project
Eric Meyers CSS Reset
