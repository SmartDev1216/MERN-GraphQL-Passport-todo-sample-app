
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretekey' // replace with your secret key
};
// Specify a name for the JWT strategy
passport.use('jwt', new JWTStrategy(options, async (jwt_payload, done) => {
    console.log('jwtpayload', jwt_payload)
  try {
    const user = await User.findById(jwt_payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));