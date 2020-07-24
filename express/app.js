const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Set the stategy to 'Local'
const LocalStrategy = require("passport-local").Strategy;

// Initialize express
const app = new express();

// Set the port
const port = process.env.PORT || 3000;

// Currently the username and password is hardcoded
passport.use(
  new LocalStrategy(function (username, password, done) {
    if (username === "admin" && password === "admin@admin.com") {
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

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Function to process authentication
const auth = () => {
  return (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
      if (error) res.status(400).json({ message: error });
      req.login(user, function (error) {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

app.post("/authenticate", auth(), (req, res) => {
  res.status(200).json({ user: req.user });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
