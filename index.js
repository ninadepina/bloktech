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


















// app.get('/', (req, res) => {
//     res.render('signin');
// });
// app.get('/index', (req, res) => {
//     res.render('index');
// });
// app.get('/account', (req, res) => {
//     res.render('account');
// });


// //signup/register page
// app.get('/signup', (req, res) => {
//     res.render('register');
// });
// // signup route
// app.post("/signup", async (req, res) => {
//     const body = req.body;
//     const email = await User.findOne({ email: body.email });
//     if (email) {
//         //an account with this emailaddress already exists
//         return res.status(400).send("An account with this emailaddress already exists..");
//     } else {
//         if (body.password === body.confirm_password) {
//             console.log('Password === Confirm Password');
//             // creating a new mongoose doc from user data
//             const user = new User(body);
//             // generate salt to hash password
//             const salt = await bcrypt.genSalt(10);
//             // set user password to hashed password
//             user.password = await bcrypt.hash(user.password, salt);
//             user.confirm_password = await bcrypt.hash(user.password, salt);
//             user.save()
//             res.redirect('/signin')
//         } else {
//             console.log("Password !=== Confirm Password");
//             res.status(400).send("Password is not the same");
//         } 
//     }
// });

// //signin/login page
// app.get('/signin', (req, res) => {
//     res.render('signin');
// })
// // signin route
// app.post("/signin", async (req, res) => {
//     const body = req.body;
//     const user = await User.findOne({ email: body.email });
//     if (user) {
//       // check user password with hashed password stored in the database
//       const validPassword = await bcrypt.compare(body.password, user.password);
//       if (validPassword) {
//         res.redirect('/index');
//       } else {
//         res.status(400).send({ error: "Invalid Password" });
//       }
//     } else {
//       res.status(401).send({ error: "User does not exist" });
//     }
// });








// ===============ERROR================
app.use((req, res, next) => {
    res.status(404).render("not-found");
});

// ===============PORT=================
app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});

