require("dotenv").config(".env");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const { CLIENT_ID, GOOGLE_AUTH_CLIENT_SECRET, CALLBACK_URI } = process.env;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: CALLBACK_URI,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(request);
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
      return done(null, profile);
    }
  )
);
