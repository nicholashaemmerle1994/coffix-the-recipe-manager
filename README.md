# Coffix - The Recipe Manager

Coffix is a web application that enables coffee lovers to create, share, and discover new coffee recipes.
The app allows users to share their favorite recipes, connect with other coffee enthusiasts, and explore new ways to enjoy their favorite beverage.

## Tech Stack

Coffix is built using the following technologies:

- Next.js (v13)
- Node.js
- TypeScript
- JavaScript
- Tailwind/DaisyUI
- PostgreSQL
- Postman (API testing & development)
- DrawSQL (Database schema planning)

## Screenshots

#### Login

![Login](/login.png?raw=true)

#### New Recipe

#### Newest Posts

#### Single Post

#### Comment

## Features

Coffix comes with the following features:

- Detailed recipe form: Coffix allows users to create and share their coffee recipes with ease. The recipe form includes detailed fields such as roaster, coffee name, brew setup (choose between 5 categories of methods, amount of coffee, temperature, brew time, etc.), tasting notes to describe the coffee, and the ability to upload a picture.
- Chat functionality: Coffix enables users to share their thoughts about the recipe in comments and chat with other users.
- Follow other users: Coffix allows users to follow other users and keep track of their recipes.
- User profiles: Coffix has user profiles that display the user's information, including their recipes, followers, and following.
- Social sharing: Coffix allows users to share their recipes on social media platforms like Facebook, Twitter, and Pinterest.

## Roadmap

Here are some of the upcoming features i plan to add:

- Search functionality: Implement a powerful search system that enables users to find coffee recipes based on various criteria, including brewing method and tasting notes.
- Like functionality: Users will be able to like recipes and see the most popular recipes on Coffix.
- Mark recipes as private: Users can choose to mark their recipes as private so only they can see them.

i am always looking for ways to improve Coffix and welcome any feedback or suggestions you may have.

## Installation

To install Coffix, follow these steps:

1. Clone the project on your local machine (run each line individually):

```
git clone <url>
cd <repo name>
yarn
```

2. On Windows

```
psql -U postgres
```

On macOS
`psql postgres`
On Linux
`sudo -u postgres psql`

3. Set up the database

```
 CREATE DATABASE <database name>;
 CREATE USER <user name> WITH ENCRYPTED PASSWORD <user password>;
 GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

4. After queries are successfully ran, quit psql and connect to the database

```
\q
```

On Windows & macOS

```
psql -U <user name> <database name>
```

On Linux

```
sudo -u <user name> psql -U <user name> <database name>
```

5. In the repository's directory, run migrations using ley:

```
yarn migrate up
```

6. Create a .env file:

- Open the project in your code editor
- Copy the content of the .env.example file into the .env file
- Replace xxxxxxxx with the access information
- add .env file to .gitignore

7. (Optional) Start deployment server:

```
yarn dev
```

## Contributing

If you'd like to contribute to Coffix, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository (`git clone https://github.com/your-username/coffix.git`).
3. Create a new branch for your feature (`git checkout -b my-feature`).
4. Make changes to the codebase and commit them (`git commit -am 'Add my new feature'`).
5. Push your changes to your forked repository (`git push origin my-feature`).
6. Open a pull request on GitHub.

## License

Coffix is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
