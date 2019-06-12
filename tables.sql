DROP TABLE users;
DROP TABLE food_input;
-- DROP TABLE weight_record;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password TEXT,
  weight REAL,
  gender TEXT,
  activity_level TEXT,
  diet_goal TEXT,
  goal_weight REAL,
  date_created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  goal_date timestamptz,
  current_weight REAL,
  date_updated timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS food_input (
	id SERIAL PRIMARY KEY,
	calories INTEGER,
	user_id INTEGER,
	food_desc TEXT,
	date_submitted timestamptz
);

-- CREATE TABLE IF NOT EXISTS weight_record (
-- 	id SERIAL PRIMARY KEY,
-- 	updated_weight REAL,
-- 	user_id INTEGER,
-- 	date_updated DATE NOT NULL DEFAULT CURRENT_DATE
-- );

-- CREATE TABLE IF NOT EXISTS users_details (
-- 	id SERIAL PRIMARY KEY,
-- 	weight REAL,
--   gender TEXT,
--   activity_level TEXT,
--   diet_goal TEXT,
--   goal_weight REAL,
-- 	user_id INTEGER,
-- 	date_created DATE NOT NULL DEFAULT CURRENT_DATE
-- );