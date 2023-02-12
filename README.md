# Simple users API

A tiny server app based on Express(Node.js).

## Available Endpoints

`/registration` - register new user

`/activation/:activationToken` - activate new user

`/login` - authenticate as a user

`/logout` - log out

`/users` - get all available users depending on a role

`/users/:id` - change user's boss

### Tech Stack
* Node.js
* Express
* PostgreSQL
* Sequelize
* jsonwebtoken
* bcrypt
* nodemailer

### Installing
* Fork and clone this repository
* Run `npm install` in your terminal
* Run `npm start`

