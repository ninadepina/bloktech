const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')
const User = require('./models/User')
require('dotenv').config()

connectDB();

// const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const multer = require('multer');
const upload = multer({ dest: './public/data/uploads/' })

const PORT = process.env.PORT || 3000;


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

//signup/register page
// app.post('/signup', async (req, res) => {
//     // const password = document.querySelector('input[name="password"]');
//     // const confirm_password = document.querySelector('input[name="confirm_password"]');
//     await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         confirm_password: req.body.confirm_password,
//         namePet: req.body.namePet,
//         birthday: req.body.birthday,
//         breed: req.body.breed
//     })
//     res.redirect('/signin')
// });

app.post('/signup', (req, res) => {
    try {
        User.findOne({email: req.body.email}).then((user) => {
            if (user) {
                //An account with this emailaddress already exists
                return res.status(400).send("An account with this emailaddress already exists..")
            } else {
                //emailaddress has not been used before
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirm_password: req.body.confirm_password,
                    namePet: req.body.namePet,
                    birthday: req.body.birthday,
                    breed: req.body.breed
                });

                if (req.body.password === req.body.confirm_password) {
                    console.log('Password === Confirm Password')
                } else {
                    console.log("Password !=== Confirm Password")
                    res.status(400).send("Password is not the same")
                }  

                newUser.save()
                res.redirect('/signin');
            }
        });
    } catch (error) {
        throw new Error(error);
    }
});

//signin/login page
app.get('/signin', (req, res) => {
    res.render('signin');
})

app.use((req, res, next) => {
    res.status(404).render('not-found');
})

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})

