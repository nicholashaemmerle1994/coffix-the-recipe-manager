-- Create Database
CREATE DATABASE coffix;
CREATE USER coffix WITH ENCRYPTED PASSWORD 'coffix';
GRANT ALL PRIVILEGES ON DATABASE coffix TO coffix;
\connect coffix;
CREATE SCHEMA coffix AUTHORIZATION coffix;

-- Create  Category Table
CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    icon varchar(100) NOT NULL,
    site_name varchar(100) NOT NULL
);
-- Insert Data into category
INSERT INTO category (name, icon, site_name)
VALUES
('Espresso', '/portafilter.png', 'espresso'),
('French Press', '/frenchpress.png', 'frenchpress'),
('AeroPress', '/aeropress.png', 'aeropress'),
('V60', '/v60.png', 'v60'),
('Moka Pot', '/moka.png', 'moka');

-- Create user Table
CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
);

-- Insert Data into users
INSERT INTO users (username, password, email) VALUES
('admin', 'admin', 'admin@admin.at')

-- Create profile table
CREATE TABLE profile (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    bio VARCHAR(500),
    post_id integer REFERENCES posts (id)
);

-- Create posts table
CREATE TABLE posts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer REFERENCES category (id),
    user_id integer REFERENCES users (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment_id integer REFERENCES comments (id),
    recipe_id integer REFERENCES recipes (id),
);

-- Create comments table
CREATE TABLE comments (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    post_id integer REFERENCES posts (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment VARCHAR(500)
);

-- Create recipes table
CREATE TABLE recipes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    post_id integer REFERENCES posts (id),
    category_id integer REFERENCES category (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    coffee varchar(100) NOT NULL,
    roaster varchar(100) NOT NULL,
    amount_in integer NOT NULL,
    amount_out integer NOT NULL,
    grind_size integer NOT NULL,
    brew_temperatur integer NOT NULL,
    brew_time integer NOT NULL,
    taste text[] NOT NULL,
    notes varchar(500)
);


-- Just for testing
CREATE TABLE recipes (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    coffee varchar(100) NOT NULL,
    roaster varchar(100) NOT NULL,
    amount_in integer NOT NULL,
    amount_out integer NOT NULL,
    grind_size integer NOT NULL,
    brew_temperatur integer NOT NULL,
    brew_minutes integer,
    brew_seconds integer,
    notes varchar(500)
);


INSERT INTO recipes (coffee, roaster, amount_in, amount_out, grind_size, brew_temperatur, brew_minutes, brew_seconds, taste)
VALUES ('Espresso Perfetto Bar',
    'Espresso Perfetto',
    18.5,
    37,
    14,
    96,
    3,
    25,
    {"fruity", "chocolate", "caramel"});



    'Espresso Perfetto Bar',
    'Espresso Perfetto',
    18.5,
    37,
    14,
    96
    0,
    0,
    ['fruity', 'chocolate', 'caramel']
