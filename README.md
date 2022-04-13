# 👋 Welcome to Pawfinder: adopt a pet!
_A platform designed to help foster pets find their new home._
The concept is like a tinder for (foster) pets and (potential) owners. Shelters can sign up pets. Users (potential owners) can start swiping on the pets. When they see a pet they like, or dislike them. All the liked dogs will be shown in a list, that can later be refound. You can chat with the shelters of your liked pets and you will be provided with more information. I will be making a signup/login feature for this application. 

![Pawfinder Banner](https://user-images.githubusercontent.com/89778503/162062311-120cfb51-106c-4513-bad9-5e6ed0473a3f.png)

---

## 📝 Installation
A code editor is needed to continue.
### Install NODE.js
* [Install Node.js](https://nodejs.org/en/download/)
* Open your terminal, and type `node install` in your terminal
* To check if Node.js is installed, type `node --version`

### Install GIT
* Open your terminal, and type `git install` in your terminal
* To check if Node.js is installed, type `git --version`

### Configure GIT and Github
Connect GIT and GitHub in your terminal. This can be down by typing the following code into your terminal:
```
$ git config --global user.name "username here"
$ git config --global user.email "email here"
```

### Clone repo
Download this project and open it with your code editor. Open your terminal on the path you want to download this repository on and type the following code in your terminal:
```
$ git clone https://github.com/ninadepina/bloktech.git
```

### Install the dependencies
Install all the needed dependencies:
```
$ cd bloktech
$ npm install
```

### Run the code
Go to the repository in the terminal and run the project:
```
$ cd bloktech
$ npm run start
```
Test the feature: [http://localhost:3000/](http://localhost:3000/)

### Connect to a database
I personally use [MongoDB](https://www.mongodb.com), use [their guide](https://docs.mongodb.com/manual/tutorial/getting-started/) to set up your own connection.

---

## 🤖 Dependencies
The following dependencies are being used:
* [BCrypt](https://github.com/kelektiv/node.bcrypt.js) - for hashing passwords.
* [Body-parser](https://github.com/expressjs/body-parser) - to fish out data from forms.
* [Dotenv](https://github.com/motdotla/dotenv) - to securely store credentials.
* [Express](https://expressjs.com/en/api.html) - used for its middleware and routing.
* [Express-flash](https://github.com/RGBboy/express-flash) - define a flash message and render it without redirecting the request.
* [Express-handlebars](https://github.com/express-handlebars/express-handlebars) - a templating engine.
* [Express-session](https://github.com/expressjs/session) - provides sessions to store user session data for persistency.
* [Mongoose](https://github.com/Automattic/mongoose) - object modeling tool for MongoDB.
* [MongoDB](https://github.com/mongodb/node-mongodb-native) - as database.
* [NodeJS](https://nodejs.org/en/) - to execute JavaScript code outside a web browser.
* [Nodemon](https://github.com/remy/nodemon) - automatically restarts the localhost when it detects file changes.
* [Passport](https://github.com/jaredhanson/passport) + [Passport-local](https://github.com/jaredhanson/passport-local) - authentication middleware for Node.js.

---

## 📝 License
[MIT](https://github.com/ninadepina/bloktech/blob/main/LICENSE) © Nina Vens <br>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
