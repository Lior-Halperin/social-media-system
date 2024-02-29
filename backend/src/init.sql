CREATE TABLE users (
    id INT PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL UNIQUE,
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    tal INT,
    role ENUM('User','Manager', 'Admin') DEFAULT ('User')
);

CREATE TABLE cities (
    cityId INT PRIMARY KEY, 
    hebrewName VARCHAR(30),
    englishName VARCHAR(50),
    hashDetails VARCHAR(512)
);
