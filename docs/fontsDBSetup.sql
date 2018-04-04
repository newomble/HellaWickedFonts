DROP DATABASE IF EXISTS hellawickedfonts;

CREATE DATABASE hellawickedfonts;
\c hellawickedfonts;

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
	comment_id SERIAL,
	FOREIGN KEY (user_id) REFERENCES user,
	FOREIGN KEY (font_id) REFERENCES font,
	comment_text TEXT,
	rating INT,
	PRIMARY KEY (comment_id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user(
	user_id SERIAL,
	username VARCHAR(45),
	password VARCHAR(45),
	salt VARCHAR(45),
	email VARCHAR(45),
	PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS rating;
CREATE TABLE rating(
	rating_id SERIAL,
	FOREIGN KEY (user_id) REFERENCES user,
	FOREIGN KEY (font_id) REFERENCES font,
	rating SMALLINT,
	FOREIGN KEY (comment_id) REFERENCES comment,
	PRIMARY KEY (rating_id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user(
	user_id SERIAL,
	username VARCHAR(45),
	password VARCHAR(45),
	salt VARCHAR(45),
	email VARCHAR(45),
	PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS sample_text;
CREATE TABLE sample_text(
	sample_id SERIAL,
	FOREIGN KEY (font_id) REFERENCES sample_text,
	text TEXT,
	PRIMARY KEY (sample_id)
);

DROP TABLE IF EXISTS font;
CREATE TABLE font(
	font_id SERIAL
	family VARCHAR(45),
	source_json VARCHAR (45) NOT NULL DEFAULT '/fonts/json/',
	popularity SERIAL DEFAULT -1,
	kind VARCHAR(15) NOT NULL DEFAULT 'unknown',
	PRIMARY KEY (font_id)
);

DROP TABLE IF EXISTS user_font;
CREATE TABLE user_font (
	user_font_id SERIAL,
	FOREIGN KEY (user_user_id) REFERENCES user (user_id),
	FOREIGN KEY (font_font_id) REFERENCES font (font_id),
	rank INT,
	PRIMARY KEY (user_font_id)
);