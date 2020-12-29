DROP TABLE IF EXISTS userID CASCADE;
DROP TABLE IF EXISTS favorite CASCADE;


CREATE TABLE userID(
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  city VARCHAR(255),
  us_state VARCHAR(255),
  miles_hiked DECIMAL
);

CREATE TABLE favorite(
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
);

SELECT * FROM favorite JOIN userID ON favorite.username = userID.ID

