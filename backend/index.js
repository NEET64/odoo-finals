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
app.use(cors());
// app.use(cors({ origin: process.env.FRONTEND, credentials: true }));

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

app.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', { session: false }, (err, result, info) => {
        if (err) {
            return next(err);
        }
        if (!result) {
            return res.status(400).json(info);
        }
        res.json(result);
    })(req, res, next);
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', { session: false }, (err, result, info) => {
        if (err) {
            return next(err);
        }
        if (!result) {
            return res.status(400).json(info);
        }
        res.json(result);2
    })(req, res, next);
});


const port = process.env.PORT || 3000;

// setting up http server at port
app.listen(port, () => {
    console.log(`There server is running at ${port}`);
});