-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema timeletter
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema timeletter
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `timeletter` DEFAULT CHARACTER SET utf8 ;
USE `timeletter` ;

-- -----------------------------------------------------
-- Table `timeletter`.`authority`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`authority` ;

CREATE TABLE IF NOT EXISTS `timeletter`.`authority` (
  `authority_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`authority_name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO authority (authority_name) values ('ROLE_USER');
INSERT INTO authority (authority_name) values ('ROLE_ADMIN');


-- -----------------------------------------------------
-- Table `timeletter`.`club`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`club` ;

CREATE TABLE IF NOT EXISTS `timeletter`.`club` (
  `club_id` INT NOT NULL,
  `club_name` VARCHAR(10) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`club_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `timeletter`.`hibernate_sequence`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`hibernate_sequence` ;

-- CREATE TABLE IF NOT EXISTS `timeletter`.`hibernate_sequence` (
--   `next_val` BIGINT NULL DEFAULT NULL)
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `timeletter`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`user` ;

CREATE TABLE IF NOT EXISTS `timeletter`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `activated` TINYINT NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `profile` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `timeletter`.`user_has_authority`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`user_has_authority` ;

CREATE TABLE IF NOT EXISTS `timeletter`.`user_has_authority` (
  `user_id` INT UNSIGNED NOT NULL,
  `authority_name` VARCHAR(50) NOT NULL,
  INDEX `fk_user_has_authority_authority_idx` (`authority_name` ASC) INVISIBLE,
  PRIMARY KEY (`user_id`, `authority_name`),
  CONSTRAINT `fk_user_has_authority_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `timeletter`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_authority_authority`
    FOREIGN KEY (`authority_name`)
    REFERENCES `timeletter`.`authority` (`authority_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



-- -----------------------------------------------------
-- Table `timeletter`.`club`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `club`;
CREATE TABLE `club` (
  `club_id` int NOT NULL AUTO_INCREMENT,
  `club_name` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  `club_desc` varchar(100) DEFAULT NULL,
  `club_profile` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`club_id`)
) 
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



-- -----------------------------------------------------
-- Table `timeletter`.`club_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `club_member`;
CREATE TABLE `club_member` (
  `user_id` int unsigned DEFAULT NULL,
  `club_id` int DEFAULT NULL,
  KEY `club_member_idx` (`user_id`),
  KEY `member_club_idx` (`club_id`),
  CONSTRAINT `club_member` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `member_club` FOREIGN KEY (`club_id`) REFERENCES `club` (`club_id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `timeletter`.`letter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `timeletter`.`letter` ;
CREATE TABLE IF NOT EXISTS `timeletter`.`letter` (
  `letter_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(256) NULL,
  `message` VARCHAR(100) NULL,
  `open_date` DATETIME NULL,
  `lat` DECIMAL(10,8) NULL,
  `lng` DECIMAL(11,8) NULL,
  `alert` TINYINT NULL,
  `is_private` TINYINT NULL,
  `is_open` TINYINT NULL,
  PRIMARY KEY (`letter_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `timeletter`.`user_has_letter`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `timeletter`.`user_has_letter` ;
CREATE TABLE IF NOT EXISTS `timeletter`.`user_has_letter` (
  `user_id` INT UNSIGNED NOT NULL,
  `letter_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `letter_id`),
  INDEX `fk_user_has_letter_letter1_idx` (`letter_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_letter_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `timeletter`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_letter_letter1`
    FOREIGN KEY (`letter_id`)
    REFERENCES `timeletter`.`letter` (`letter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
