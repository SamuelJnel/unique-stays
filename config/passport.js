const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const Guest = require("../models/guest");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("this is the profile from passport js");
      console.log(profile);
      Guest.findOne({ googleId: profile.id }, function (err, guest) {
        if (err) return cb(err);
        if (guest) {
          return cb(null, guest);
        } else {
          var newGuest = new Guest({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newGuest.save(function (err) {
            if (err) return cb(err);
            return cb(null, newGuest);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (guest, done) {
  done(null, guest.id);
});

passport.deserializeUser(function (id, done) {
  Guest.findById(id, function (err, guest) {
    done(err, guest);
  });
});
