const passport = require("passport");

// Set the stategy to 'Local'
const LocalStrategy = require("passport-local").Strategy;

// Currently the username and password is hardcoded
passport.use(
  new LocalStrategy(function (username, password, done) {
    if (username === "admin" && password === "admin") {
      return done(null, username);
    } else {
      return done("unauthorized access", false);
    }
  })
);

// Serialize and deserialize the user
passport.serializeUser(function (user, done) {
  if (user) done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

// Function to process authentication
const auth = () => {
  return (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
      if (error) res.status(400).json({ statusCode: 200, message: error });
      req.login(user, function (error) {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

// Check if the user is logged in
const isLoggedIn = (req, res, next) => {
  console.log("session ", req.session);
  if (req.isAuthenticated()) {
    //console.log('user ', req.session.passport.user)
    return next();
  }
  return res
    .status(400)
    .json({ statusCode: 400, message: "not authenticated" });
};

module.exports = {
  auth: auth,
  isLoggedIn: isLoggedIn,
};
