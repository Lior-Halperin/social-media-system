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

CREATE TABLE streets (
    streetId INT NOT NULL, 
    cityId INT ,
    hebrewName VARCHAR(30),
    englishName VARCHAR(50),
    PRIMARY KEY (streetId),
    FOREIGN KEY (cityId) REFERENCES cities(cityId)
);

CREATE TABLE socialCustomer (
    customerId INT NOT NULL PRIMARY KEY, 
    firstName VARCHAR(30),
    lastName VARCHAR(30),
    tal INT
);

CREATE TABLE addresses (
    addressesId INT NOT NULL, 
    customerId INT UNIQUE,
    cityId INT UNIQUE,
    streetId INT UNIQUE,
    houseNumber VARCHAR(3),
    apartmentNumber INT,
    floor INT,
    PRIMARY KEY (addressesId),
    FOREIGN KEY (customerId) REFERENCES socialCustomer(customerId),
    FOREIGN KEY (cityId) REFERENCES cities(cityId),
    FOREIGN KEY (streetId) REFERENCES streets(streetId)
);