-- create_tables.sql

-- Create the 'users' table
CREATE TABLE users (
    id VARCHAR(10) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    level INTEGER NOT NULL,
    loggedin BOOLEAN NOT NULL,
    wantsUpdate BOOLEAN
);
