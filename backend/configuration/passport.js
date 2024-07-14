const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require("jsonwebtoken");

// User model (replace with your actual database interaction)
const User = require('../model/user'); // Adjust path as needed

const createUserObject = (profile) => {
    return {
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos[0].value,
    };
};

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Google authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User(createUserObject(profile));
            await user.save();
        }

        const token = generateToken(user);
        return done(null, { user, token });

    } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
    }
}));

// Local Signup Strategy
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password',
    passReqToCallback: true // Allow access to entire request object
}, async (req, email, password, done) => { // Correct parameter order

    const { userName, address, contact, role } = req.body; // Destructure parameters from req.body

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return done(null, false, { message: 'Email already exists.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            address,
            contact,
            role,
        });

        await newUser.save();

        const token = generateToken(newUser);
        return done(null, { user: newUser, token }); // Return user and token on successful signup

    } catch (err) {
        console.error('Error during local signup:', err);
        return done(err); // Properly handle error
    }
}));


// Local Login Strategy (same as before)
passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // Adjust field name if different
    passwordField: 'password'
}, async (email, password, done) => {
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const token = generateToken(user);
        return done(null, { user, token }); // User successfully authenticated

    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;