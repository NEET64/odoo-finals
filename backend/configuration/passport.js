const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt'); // For password hashing

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

        return done(null, user);
    } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
    }
}));

// Local Signup Strategy
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // Adjust field name if different
    passwordField: 'password',
    passReqToCallback: true // Allow access to entire request object
}, async (req, email, password, done) => {
    try {

        const existingUser = await User.findOne({ email }); // Check for existing user
        if (existingUser) {
            return done(null, false, { message: 'Email already exists.' });
        }

        const saltRounds = 10; // Adjust salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save(); // Save user to database

        return done(null, newUser); // User successfully signed up
    } catch (err) {
        console.error('Error during local signup:', err);
        return done(err);
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

        return done(null, user); // User successfully authenticated
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;