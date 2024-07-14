const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const connectDB = require("./configuration/connection");
connectDB();

const router = require("./router/index");

require("./configuration/passport");

// allow access of the api
app.use(cors({ origin: process.env.FRONTEND, credentials: true }));

// to support incoming form data in json
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


const path = require("path");
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));

app.use("/v1", router);

app.get("/", (req, res) => {
    res.json({
        message: "This is home route",
    });
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate('google', { failureRedirect: "/login", session: true }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND}/home`);
    }
);

app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    if (req.user) {
        res.status(201).json({ message: 'User created successfully!' });
    } else {
        res.status(400).json({ message: 'Signup failed.' });
    }
});

app.post('/login', passport.authenticate('local-login'), (req, res) => {
    if (req.user) {
        res.status(200).json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ message: 'Login failed.' });
    }
});


const port = process.env.PORT || 3000;

// setting up http server at port
app.listen(port, () => {
    console.log(`There server is running at ${port}`);
});