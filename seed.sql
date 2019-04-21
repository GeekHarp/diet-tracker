DROP TABLE users;
DROP TABLE users_details;
DROP TABLE calorie_diary;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT
);

CREATE TABLE users_details (
	id SERIAL PRIMARY KEY,
	weight REAL,
  gender TEXT,
  activity_level TEXT,
  diet_goal TEXT,
  goal_weight REAL,
	user_id INTEGER,
	date_created DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE calorie_diary (
	id SERIAL PRIMARY KEY,
	calories INTEGER,
	user_id INTEGER,
	date_created DATE NOT NULL DEFAULT CURRENT_DATE
);