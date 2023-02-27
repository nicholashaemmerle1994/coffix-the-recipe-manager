export async function up(sql) {
  await sql`
  CREATE TABLE category (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    icon varchar(100) NOT NULL,
    site_name varchar(100) NOT NULL
);
CREATE TABLE users (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
);
CREATE TABLE profile (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    bio VARCHAR(500),
    post_id integer REFERENCES posts (id)
);
CREATE TABLE posts (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id integer REFERENCES category (id),
    user_id integer REFERENCES users (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment_id integer REFERENCES comments (id),
    recipe_id integer REFERENCES recipes (id),
);
CREATE TABLE comments (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer REFERENCES users (id),
    post_id integer REFERENCES posts (id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    comment VARCHAR(500)
);
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
    grind_size integer(100) NOT NULL,
    brew_temperatur integer NOT NULL,
    brew_time integer NOT NULL,
    taste varchar(100) NOT NULL,
    notes varchar(500)
);
`;
}

export async function down(sql) {
  await sql`
  DROP TABLE category;
  DROP TABLE users;
  DROP TABLE profile;
  DROP TABLE posts;
  DROP TABLE comments;
  DROP TABLE recipes;
  `;
}

// -- Create  Category Table

// -- Insert Data into category
// INSERT INTO category (name, icon, site_name)
// VALUES
// ('Espresso', '/portafilter.png', 'espresso'),
// ('French Press', '/frenchpress.png', 'frenchpress'),
// ('AeroPress', '/aeropress.png', 'aeropress'),
// ('V60', '/v60.png', 'v60'),
// ('Moka Pot', '/moka.png', 'moka');

// -- Insert Data into users
// INSERT INTO users (username, password, email) VALUES
// ('admin', 'admin', 'admin@admin.at')

// -- Create profile table

// -- Create posts table

// -- Create comments table

// -- Create recipes table
