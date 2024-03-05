const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use('graphql', new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user || !user.authenticate(password)) return done(null, false);
        console.log('passport-config user',user)
        return done(null, user);
    });
}));