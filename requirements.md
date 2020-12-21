# Software Requirements
---
## Vision
Deliver an easy and effective application for locating, saving and tracking hikes. The pain point this project will solve is to integrate both searching and tracking hike information since most of the current apps do one or the other of these functions but not both. The app will be a useful tool for finding trails you may not have known about, tracking your personal progress and information about the trails.
## Scope
#### In
- Will allow the user to create a profile
- Will allow the user to search for hikes
- Will allow the user to save trail data to their prfoile
- Will provide trail data for selected trails
  - total length
  - location
  - conditions
- Will allow the user to update ratings and descriptions for completed hikes
- Will allow the user to mark trails as hiked and track total miles hiked
#### Out
- Will not require passwords for user profile access
- Will not track calories burned
- Will not actively track the users location
- Will not provide distance or directions to trails from users current location
### Minimum Viable Product
App that allows users to:
- create a profile
- search for hikes based on location
- save hikes to a personal profile
- track completed hikes and total miles hiked
- see and edit descriptions and rating for chosen hikes
### Stretch Goals
- Addition of a bird information for hike location from an API
- Provide current weather conditions for a selected trail
- Add elevation information for trails
- Add filtering system for trail searches
- Add a map of trails (searched for and/or saved)
- Add "date hiked" info for completed hikes
## Functional Requirements
- User can create or visit an existing profile
- User can view a detailed profile page containing
  - total miles hiked
  - favorite trails
  - completed hikes
- User can search for hikes based on location
- User can add/delete hikes from their profile
### Data Flow
1. User arrives at the home page
1. Modal asks for username or cues user to create one
1. After username entry, navigate from homepage to desired page: new search page, deatial page, about us page or personal profile page
1. **On Search Page** 
   -  Perform a search, get results, check detailed view *(modal)*, option to save to favorites and choose to return to search or detail page
1. **On Profile Page**
   - View favorite hikes, completed hikes, total miles hiked, delete favorites, mark hikes completed and update personal trail comments/ratings
## Non-Functional Requirements
- Security:
  - A unique username will be required for each profile
  - Use of an SQL database to accomplish this
  - Prevent overlapping user data with unique "keys"
- Compatibility:
  - App will work on multiple devices and in various browsers
  - App will be designed mobile-first and utilize breakpoints to be responsive
  - Ensure consistent functionality for all users
