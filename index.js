const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
require('dotenv').config();
let PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// const methodOverride = require('method-override');
const connectDB = require('./config/db')
const User = require('./models/User')

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: false}));
app.use('/static', express.static('static'));
// app.use(methodOverride('_method'));


// const multer = require('multer');
// const upload = multer({ dest: './public/data/uploads/' })


//handlebars settings
app.engine('handlebars', engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/"
}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

//landing page
app.get('/', (req, res) => {
    res.render('signin');
})
app.get('/home', (req, res) => {
    res.render('home');
})


//signup/register page
app.get('/signup', (req, res) => {
    res.render('register');
})
// signup route
app.post("/signup", async (req, res) => {
    const body = req.body;
    const email = await User.findOne({email: body.email});
    if (email) {
        //an account with this emailaddress already exists
        return res.status(400).send("An account with this emailaddress already exists..")
    } else {
        if (body.password === body.confirm_password) {
            console.log('Password === Confirm Password')
            // creating a new mongoose doc from user data
            const user = new User(body);
            // generate salt to hash password
            const salt = await bcrypt.genSalt(10);
            // set user password to hashed password
            user.password = await bcrypt.hash(user.password, salt);
            user.confirm_password = await bcrypt.hash(user.password, salt);
            user.save()
            res.redirect('/signin')
        } else {
            console.log("Password !=== Confirm Password")
            res.status(400).send("Password is not the same")
        } 
    }
});

//signin/login page
app.get('/signin', (req, res) => {
    res.render('signin');
})
// signin route
app.post("/signin", async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        res.redirect('/account')
      } else {
        res.status(400).send({ error: "Invalid Password" });
      }
    } else {
      res.status(401).send({ error: "User does not exist" });
    }
});

// 404 error
app.use((req, res, next) => {
    res.status(404).render('not-found');
})

// PORT
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
})

