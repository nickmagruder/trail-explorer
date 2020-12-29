DROP TABLE IF EXISTS userID;
DROP TABLE IF EXISTS favorite;


CREATE TABLE userID(
  ID SERIAL PRIMARY KEY,
  username VARCHAR(255),
  Miles_Hiked Number
);

CREATE TABLE favorite(
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
);
