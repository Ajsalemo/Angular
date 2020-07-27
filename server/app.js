require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const models = require("./models");
const auth = require("./config/auth");

// Initialize express
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Serialize and deserialize the user
passport.serializeUser((user, done) => {
  if (user) done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Load the local-signup strategy from passport
require("./config/passport")(passport, models.User);

app.post("/authenticate", auth(passport), (req, res, error) => {
  if (error) return res.status(400);
  res.status(200).json({ user: req.user });
});

// Create and sync the database through Sequelize
models.sequelize
  .sync()
  .then(() => {
    console.log("Postgres has started and synced");
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
  });
