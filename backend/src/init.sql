-- Create a new database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS social_media_system;

-- Use the newly created database
USE social_media_system;

CREATE TABLE
    IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(20) NOT NULL UNIQUE,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        tal INT,
        role ENUM ('User', 'Manager', 'Admin') DEFAULT 'User'
    );

CREATE TABLE
    IF NOT EXISTS cities (
        city_id INT PRIMARY KEY AUTO_INCREMENT,
        hebrew_name VARCHAR(30) NOT NULL,
        english_name VARCHAR(50) NOT NULL,
        hash_details VARCHAR(512)
    );

CREATE TABLE
    IF NOT EXISTS streets (
        street_id INT PRIMARY KEY AUTO_INCREMENT,
        city_id INT NOT NULL,
        hebrew_name VARCHAR(30) NOT NULL,
        english_name VARCHAR(50) NOT NULL,
        FOREIGN KEY (city_id) REFERENCES cities (city_id) ON DELETE CASCADE,
        INDEX (city_id)
    );

CREATE TABLE
    IF NOT EXISTS social_customers (
        customer_id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        tal INT
    );

CREATE TABLE
    IF NOT EXISTS addresses (
        address_id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id INT NOT NULL,
        city_id INT NOT NULL,
        street_id INT NOT NULL,
        house_number VARCHAR(3) NOT NULL,
        apartment_number INT,
        floor INT NOT NULL,
        longitude INT NOT NULL,
        latitude INT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES social_customers (customer_id) ON DELETE CASCADE,
        FOREIGN KEY (city_id) REFERENCES cities (city_id) ON DELETE CASCADE,
        FOREIGN KEY (street_id) REFERENCES streets (street_id) ON DELETE CASCADE,
        INDEX (customer_id),
        INDEX (city_id),
        INDEX (street_id)
    );

CREATE TABLE
    IF NOT EXISTS volunteer_projects (
        project_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL,
        date DATE NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS projects_customers (
        customer_id INT NOT NULL,
        project_id INT NOT NULL,
        PRIMARY KEY (customer_id, project_id),
        FOREIGN KEY (customer_id) REFERENCES social_customers (customer_id) ON DELETE CASCADE,
        FOREIGN KEY (project_id) REFERENCES volunteer_projects (project_id) ON DELETE CASCADE,
        INDEX (customer_id),
        INDEX (project_id)
    );