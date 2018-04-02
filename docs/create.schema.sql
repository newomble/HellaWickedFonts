DROP SCHEMA IF EXISTS `hellawickedfonts` ;

CREATE SCHEMA IF NOT EXISTS `hellawickedfonts` DEFAULT CHARACTER SET utf8 ;
USE `hellawickedfonts` ;

DROP TABLE IF EXISTS `hellawickedfonts`.`font` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`font` (
  `font_id` INT NOT NULL AUTO_INCREMENT,
  `family` VARCHAR(45) NULL,
  `source_json` VARCHAR(45) NOT NULL DEFAULT '/fonts/json/',
  `popularity` INT NOT NULL DEFAULT -1,
  `kind` VARCHAR(15) NOT NULL DEFAULT 'unknown',
  PRIMARY KEY (`font_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `hellawickedfonts`.`user` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `salt` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `hellawickedfonts`.`comment` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`comment` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `font_id` INT NOT NULL,
  `comment_text` LONGTEXT NULL,
  `rating` INT UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_comment_font1_idx` (`font_id` ASC),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `hellawickedfonts`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_font1`
    FOREIGN KEY (`font_id`)
    REFERENCES `hellawickedfonts`.`font` (`font_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `hellawickedfonts`.`rating` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`rating` (
  `rating_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `font_id` INT NOT NULL,
  `rating` TINYINT(1) NOT NULL DEFAULT 0,
  `comment_id` INT NOT NULL,
  PRIMARY KEY (`rating_id`),
  INDEX `fk_rating_user_idx` (`user_id` ASC),
  INDEX `fk_rating_font1_idx` (`font_id` ASC),
  INDEX `fk_rating_comment1_idx` (`comment_id` ASC),
  CONSTRAINT `fk_rating_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `hellawickedfonts`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_font1`
    FOREIGN KEY (`font_id`)
    REFERENCES `hellawickedfonts`.`font` (`font_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rating_comment1`
    FOREIGN KEY (`comment_id`)
    REFERENCES `hellawickedfonts`.`comment` (`comment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `hellawickedfonts`.`sample_text` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`sample_text` (
  `sample_id` INT NOT NULL AUTO_INCREMENT,
  `font_id` INT NOT NULL,
  `text` LONGTEXT NULL,
  PRIMARY KEY (`sample_id`),
  INDEX `fk_sample_text_font1_idx` (`font_id` ASC),
  CONSTRAINT `fk_sample_text_font1`
    FOREIGN KEY (`font_id`)
    REFERENCES `hellawickedfonts`.`font` (`font_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `hellawickedfonts`.`user_font` ;

CREATE TABLE IF NOT EXISTS `hellawickedfonts`.`user_font` (
  `user_font_id` INT NOT NULL AUTO_INCREMENT,
  `user_user_id` INT NOT NULL,
  `font_font_id` INT NOT NULL,
  `rank` INT NULL,
  PRIMARY KEY (`user_font_id`),
  INDEX `fk_user_font_user1_idx` (`user_user_id` ASC),
  INDEX `fk_user_font_font1_idx` (`font_font_id` ASC),
  CONSTRAINT `fk_user_font_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `hellawickedfonts`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_font_font1`
    FOREIGN KEY (`font_font_id`)
    REFERENCES `hellawickedfonts`.`font` (`font_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

