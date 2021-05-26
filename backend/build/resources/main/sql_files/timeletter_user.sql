-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- user Table Create SQL
CREATE TABLE user
(
    `user_id`    INT             NOT NULL    AUTO_INCREMENT COMMENT '유저id', 
    `email`      VARCHAR(45)     NOT NULL    COMMENT '이메일', 
    `name`       VARCHAR(20)     NOT NULL    COMMENT '이름', 
    `profile`    VARCHAR(256)    NULL        COMMENT '프로필', 
    `password`   VARCHAR(256)    NOT NULL    COMMENT '비밀번호', 
    `phone`      VARCHAR(20)     NOT NULL    COMMENT '연락처', 
    `activated`  TINYINT         NOT NULL    COMMENT '활성 여부', 
    CONSTRAINT  PRIMARY KEY (user_id)
);

ALTER TABLE user COMMENT 'user';


-- user Table Create SQL
CREATE TABLE club
(
    `club_id`       INT             NOT NULL    AUTO_INCREMENT COMMENT '클럽id', 
    `club_name`     VARCHAR(45)     NOT NULL    COMMENT '클럽명', 
    `user_id`       INT             NOT NULL    COMMENT '클럽장', 
    `club_profile`  VARCHAR(256)    NULL        COMMENT '클럽프로필', 
    `club_desc`     VARCHAR(100)    NOT NULL    COMMENT '클럽내용', 
    CONSTRAINT  PRIMARY KEY (club_id)
);

ALTER TABLE club COMMENT 'club';

ALTER TABLE club
    ADD CONSTRAINT FK_club_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE letter
(
    `letter_id`   INT               NOT NULL    AUTO_INCREMENT COMMENT '레터id', 
    `title`       VARCHAR(100)      NOT NULL    COMMENT '레터이름', 
    `url`         VARCHAR(256)      NULL        COMMENT '파일 주소', 
    `message`     VARCHAR(256)      NOT NULL    COMMENT '내용', 
    `open_date`   DATE              NOT NULL    COMMENT '오픈시간', 
    `latitude`    DECIMAL(10, 8)    NULL        COMMENT '위도', 
    `longitude`   DECIMAL(11, 8)    NULL        COMMENT '경도', 
    `is_private`  TINYINT           NOT NULL    COMMENT '공개여부', 
    `is_open`     TINYINT           NOT NULL    COMMENT '오픈유무', 
    `alert`       TINYINT           NOT NULL    COMMENT '알림', 
    `user_id`     INT               NULL        COMMENT '유저 ID', 
    `club_id`     INT               NULL        COMMENT '클럽 ID', 
    CONSTRAINT  PRIMARY KEY (letter_id)
);

ALTER TABLE letter COMMENT 'letter';

ALTER TABLE letter
    ADD CONSTRAINT FK_letter_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE letter
    ADD CONSTRAINT FK_letter_club_id_club_club_id FOREIGN KEY (club_id)
        REFERENCES club (club_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE authority
(
    `authority_name`  VARCHAR(50)    NOT NULL    COMMENT '권한 이름', 
    CONSTRAINT  PRIMARY KEY (authority_name)
);


-- user Table Create SQL
CREATE TABLE club_has_member
(
    `user_id`  INT    NOT NULL    COMMENT '유저id', 
    `club_id`  INT    NOT NULL    COMMENT '클럽id', 
    CONSTRAINT  PRIMARY KEY (user_id, club_id)
);

ALTER TABLE club_has_member COMMENT 'club_member';

ALTER TABLE club_has_member
    ADD CONSTRAINT FK_club_has_member_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE club_has_member
    ADD CONSTRAINT FK_club_has_member_club_id_club_club_id FOREIGN KEY (club_id)
        REFERENCES club (club_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE letter_agree
(
    `user_id`    INT    NOT NULL    COMMENT '유저id', 
    `letter_id`  INT    NOT NULL    COMMENT '레터id', 
    CONSTRAINT  PRIMARY KEY (user_id, letter_id)
);

ALTER TABLE letter_agree COMMENT 'letter_agree';

ALTER TABLE letter_agree
    ADD CONSTRAINT FK_letter_agree_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE letter_agree
    ADD CONSTRAINT FK_letter_agree_letter_id_letter_letter_id FOREIGN KEY (letter_id)
        REFERENCES letter (letter_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE user_has_authority
(
    `user_id`         INT            NOT NULL    COMMENT '유저 ID', 
    `authority_name`  VARCHAR(50)    NOT NULL    COMMENT '권한 이름', 
    CONSTRAINT  PRIMARY KEY (user_id, authority_name)
);

ALTER TABLE user_has_authority
    ADD CONSTRAINT FK_user_has_authority_authority_name_authority_authority_name FOREIGN KEY (authority_name)
        REFERENCES authority (authority_name) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE user_has_authority
    ADD CONSTRAINT FK_user_has_authority_user_id_user_user_id FOREIGN KEY (user_id)
        REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;


-- user Table Create SQL
CREATE TABLE target
(
    `letter_id`     INT            NOT NULL    COMMENT '레터 ID', 
    `phone_number`  VARCHAR(45)    NULL        COMMENT '전송되는 번호', 
    `target_id`     INT            NOT NULL    AUTO_INCREMENT COMMENT '타겟 ID', 
    CONSTRAINT  PRIMARY KEY (target_id)
);

ALTER TABLE target
    ADD CONSTRAINT FK_target_letter_id_letter_letter_id FOREIGN KEY (letter_id)
        REFERENCES letter (letter_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

INSERT INTO authority (authority_name) values ('ROLE_USER');
INSERT INTO authority (authority_name) values ('ROLE_ADMIN');

select * from user;