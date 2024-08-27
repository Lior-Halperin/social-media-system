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
    IF NOT EXISTS social_customers (
        customer_id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        update_date DATE NOT NULL,         
    );

CREATE TABLE
    IF NOT EXISTS addresses (
        address_id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id INT NOT NULL,
        country: string DEFAULT israel,
        city: VARCHAR(30) NOT NULL,
        street VARCHAR(30) NOT NULL,
        house_number VARCHAR(4) NOT NULL,
        apartment_number INT,
        floor INT NOT NULL,
        longitude INT NOT NULL,
        latitude INT NOT NULL,
        distance_km_from_jerusalem INT,
        update_date DATE NOT NULL, 
        comments VARCHAR(100),        
        FOREIGN KEY (customer_id) REFERENCES social_customers (customer_id) ON DELETE CASCADE,
        INDEX (customer_id)
    );

CREATE TABLE
    IF NOT EXISTS phone (
        phone_id: INT PRIMARY KEY AUTO_INCREMENT,
        customer_id: INT NOT NULL,
        phone_number: INT NOT NULL,
        INDEX (customer_id)
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