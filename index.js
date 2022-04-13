const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
require("dotenv").config();
let PORT = process.env.PORT || 3000;

const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const connectDB = require("./config/db");
const User = require("./models/User");


// ===============DATABASE===============
connectDB();






// ===============PASSPORT===============
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});



passport.use("local-signin", new localStrategy((username, password, done) => {
	User.findOne({ username: username }, (err, user) => {
		if (err) {
            return done(err);
        }
		if (!user) { 
            return done(null, false, { message: "This user doesn't exist.." }); 
        }

		bcrypt.compare(password, user.password, (err, res) => {
			if (err) {
                return done(err); 
            }
			if (res === false) {
                return done(null, false, { message: "Incorrect password.." });
            }
			
			return done(null, user);
		});
	});
}));







const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect("/signin");
}

const isLoggedOut = (req, res, next) => {
    if (!req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect("/");
}

// ===============EXPRESS================
// Configure Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("static"));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//handlebars settings
app.engine("handlebars", engine({
    layoutsDir: __dirname + "/views/layouts"
}));
app.set("view engine", "handlebars");
app.set("views", "views");




// ===============ROUTES===============
app.get("/", isLoggedIn, (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/signin", isLoggedOut, (req,res) => {
    res.render("signin");
});
app.post("/signin", passport.authenticate("local-signin", {
	successRedirect: "/",
	failureRedirect: "/signin",
    failureFlash: true
}));

app.get('/register', isLoggedOut, (req, res) => {
    res.render("register");
});
app.post("/register", async (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            console.log("User already exists..");
            return res.redirect("/register");
        } else {
            const new_user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                name_pet: req.body.name_pet,
                birthday: req.body.birthday,
                breed: req.body.breed
            });
            new_user.save();
            return res.redirect("/signin");
        }
    });
});

app.get("/account", isLoggedIn, (req, res) => {
    res.render('account', {
        name: req.user.name,
        email: req.user.email
    });
});

app.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/");
});





// ===============ERROR================
app.use((req, res, next) => {
    res.status(404).render("not-found");
});

// ===============PORT=================
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});

