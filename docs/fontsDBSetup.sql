
-- -----------------------------------------------------
-- HellaWickedFonts Database Script
-- 
-- Created: 4/4/2018
-- Command line:
-- psql -h localhost -U postgres -f fontsDBSetup.sql
-- -----------------------------------------------------

DROP DATABASE IF EXISTS hellawickedfonts;
CREATE DATABASE hellawickedfonts;
\c hellawickedfonts;

-- -----------------------------------------------------
-- User Table
-- -----------------------------------------------------
DROP SEQUENCE IF EXISTS user_id_seq CASCADE;
CREATE SEQUENCE user_id_seq START 1;

DROP TABLE IF EXISTS public.user  CASCADE;
CREATE TABLE public.user(
	user_id INT NOT NULL DEFAULT nextval('user_id_seq'),
	username VARCHAR(45),
	first_name VARCHAR(45),
	last_name VARCHAR(45),
	password VARCHAR(555),
	salt VARCHAR(45),
	email VARCHAR(45),
	PRIMARY KEY (user_id)
);

-- -----------------------------------------------------
-- Font Table
-- -----------------------------------------------------
DROP SEQUENCE IF EXISTS font_id_seq CASCADE;
CREATE SEQUENCE font_id_seq START 1;

DROP TABLE IF EXISTS public.font  CASCADE;
CREATE TABLE public.font(
	font_id INT NOT NULL DEFAULT nextval('font_id_seq'),
	family VARCHAR(45),
	source_json VARCHAR (45) NOT NULL DEFAULT '/fonts/json/',
	popularity INT DEFAULT -1,
	trending_rank INT,
	kind VARCHAR(15) NOT NULL DEFAULT 'unknown',
	PRIMARY KEY (font_id)
);

-- -----------------------------------------------------
-- Comment Table
-- -----------------------------------------------------

DROP SEQUENCE IF EXISTS comment_id_seq CASCADE;
CREATE SEQUENCE comment_id_seq START 1;

DROP TABLE IF EXISTS public.comment CASCADE;
CREATE TABLE public.comment(
	comment_id INT NOT NULL DEFAULT nextval('comment_id_seq'),
	user_id INT,
	font_id INT,
	comment_text TEXT,
	rating INT,
	FOREIGN KEY (user_id) REFERENCES public.user,
	FOREIGN KEY (font_id) REFERENCES public.font,
	PRIMARY KEY (comment_id)
);

-- -----------------------------------------------------
-- Rating Table
-- -----------------------------------------------------
DROP SEQUENCE IF EXISTS rating_id_seq CASCADE;
CREATE SEQUENCE rating_id_seq START 1;

DROP TABLE IF EXISTS public.rating;
CREATE TABLE public.rating(
	rating_id int NOT NULL DEFAULT nextval('rating_id_seq'),
	user_id INT,
	font_id INT,
	comment_id INT,
	rating INT,
	FOREIGN KEY (user_id) REFERENCES public.user,
	FOREIGN KEY (font_id) REFERENCES public.font,
	FOREIGN KEY (comment_id) REFERENCES public.comment,
	PRIMARY KEY (rating_id)
);

-- -----------------------------------------------------
-- Sample Text Table
-- -----------------------------------------------------
DROP SEQUENCE IF EXISTS sampletxt_id_seq CASCADE;
CREATE SEQUENCE sampletxt_id_seq START 1;

DROP TABLE IF EXISTS public.sample_text;
CREATE TABLE public.sample_text(
	sample_id INT NOT NULL DEFAULT nextval('sampletxt_id_seq'),
	font_id INT,
	sample_text TEXT,
	FOREIGN KEY (font_id) REFERENCES public.font (font_id),
	PRIMARY KEY (sample_id)
);

DROP SEQUENCE IF EXISTS history_id_seq CASCADE;
CREATE SEQUENCE history_id_seq START 1;

DROP TABLE IF EXISTS public.font_history;
CREATE TABLE public.font_history(
	history_id INT NOT NULL DEFAULT nextval('history_id_seq'),
	font_id INT,
	rank INT,
	trending_rank INT,
	time TIMESTAMP DEFAULT CURRENT_DATE,
	FOREIGN KEY (font_id) REFERENCES public.font (font_id),
	PRIMARY KEY (history_id)
);


-- -----------------------------------------------------
-- User Font Table
-- -----------------------------------------------------
DROP SEQUENCE IF EXISTS user_font_id_seq CASCADE;
CREATE SEQUENCE user_font_id_seq START 1;

DROP TABLE IF EXISTS public.user_font;
CREATE TABLE public.user_font (
	user_font_id INT NOT NULL DEFAULT nextval('user_font_id_seq'),
	user_user_id INT,
	font_font_id INT,
	rank INT,
	FOREIGN KEY (user_user_id) REFERENCES public.user (user_id),
	FOREIGN KEY (font_font_id) REFERENCES public.font (font_id),
	PRIMARY KEY (user_font_id)
);


