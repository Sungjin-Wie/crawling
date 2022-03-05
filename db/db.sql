DROP DATABASE ssada;
CREATE DATABASE ssada;
USE ssada;

create table hotdeal
(
	targetId VARCHAR(255),
    title VARCHAR(255),
    link VARCHAR(255),
    nickName VARCHAR(255),
    price VARCHAR(255),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
