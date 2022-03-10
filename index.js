const lodash = require('lodash');
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const sass = require('sass'); 
const connectDB = require('./config/db')
const User = require('./models/User')
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config()

connectDB();

const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' })

const PORT = process.env.PORT || 3000;

// app.use(express.json());

app.use('/static', express.static('static'));

//handlebars settings
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');

//landing page
app.get('/', (req, res) => {
    res.render('home');
})

//signup/register page
app.get('/signup', (req, res) => {
    res.render('register');
})

//signin/login page
app.get('/signin', (req, res) => {
    res.render('signin');
})

//signup/register page
app.post('/register', async (req, res) => {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
});

app.use((req, res, next) => {
    res.status(404).render('not-found');
})

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})

