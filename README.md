# Trail Explorer

## Authors:
* James Gerstenberger
* William Moreno
* Nick Magruder

**Version**: 1.0.0

## Overview
An application to find and save hikes that can also be used to tally total miles hiked and track progress. This will allow for personal growth by monitoring physical activity and time in nature. The application will allow you to provide yourown description and rating of each hike in addition to crowd-sourced ratings and descriptions.

## Getting Started
To get this application running on a computer a user must download the repository and use npm to install the dependencies. They must also create a .env file that contains a LocationIQ API key and Hiking Project API key. Lastly, a user must set up a postgres database and corresponding tables to match those in the schema.sql file located in the data folder.

## User Instructions
To use this application, a user must first create a profile by entering a username,the city and state they are located in. If the user already has a profile they can utilize that to login. The user will then be taken to a landing page where they can search for new trails or visit their profile page. If the user inputs a search query they will be directed to a results page where they can see trails in the search location and will be able to add them to their favorite trails on their profile page. On the profile page the user will be able to view their favorite trails and add notes or list a trail as completed. The profile page will also show the user how many miles they have hiked based on their completed hikes.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Libraries, Frameworks & Packages
  "dotenv": "^8.2.0",
  "ejs": "^3.1.5",
  "express": "^4.17.1",
  "method-override": "^3.0.0",
  "pg": "^8.5.1",
  "superagent": "^6.1.0"

## API Endpoints
TRAIL_API_KEY = 200990745-be2dc5ed83527358c3279f1cac1cdfba
GEOCODE_API_KEY = pk.ec7dd268e7db863b8ee3de2dc5489245

## Database Schema

## Change Log
12-28-2020 11:00am - Initial server build out

## Credits and Collaborations
Give credit (and a link) to other people or resources that helped you build this application.

<!-- TODO -->
<!-- error message for sign ins -->
<!-- Username placement on modal and also changing margins based on new/returning user -->
<!-- Fix glitch in modal sign in -->
<!-- SQL update back end for completed  -->