Coffix Recipe Manager
Coffix Recipe Manager is a web application developed using TypeScript, React, and Node.js, created specifically for coffee enthusiasts who want to keep track of their favorite coffee recipes. The app focuses on assisting users in managing and sharing their coffee recipes, helping them save time and effort by keeping all their recipes in one place.

Additionally, Coffix fosters a sense of community by allowing users to share their thoughts about the recipe in comments and chat with other users, as well as follow other users who share similar interests.

Tech Stack
TypeScript
React
Node.js
PostgreSQL Database
Jest (testing)
Supertest (testing)
Docker
Heroku
Features
Recipe creation and management - Add, edit, and delete coffee recipes easily.
Search functionality - Find recipes quickly based on name, category, or ingredients.
Commenting and chat - Share your thoughts about the recipe in comments and chat with other users.
Follow functionality - Follow other users who share similar interests.
Responsive design - Enjoy the app on any device, mobile or desktop.
Setup instructions
Clone the project on your local machine (run each line individually):

bash
Copy code
git clone <url>
cd <repo name>
yarn
Connect to default database as admin:
On Windows

Copy code
psql -U postgres
On macOS

Copy code
psql postgres
On Linux

Copy code
sudo -u postgres psql
Set up the database:

sql
Copy code
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD <user password>;
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
After queries are successfully ran, quit psql and connect to the database

css
Copy code
\q
On Windows & macOS

php
Copy code
psql -U <user name> <database name>
On Linux

php
Copy code
sudo -u <user name> psql -U <user name> <database name>
In the repository's directory, run migrations using ley:

Copy code
yarn migrate up
Create a .env file:

Open the project in your code editor
Copy the content of the .env.example file into the .env file
Replace xxxxxxxx with the access information
add .env file to .gitignore
(Optional) Start deployment server:

Copy code
yarn dev
Open http://localhost:3000 in your browser to see the result.
