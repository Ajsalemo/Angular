require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const models = require("./models");
const auth = require("./auth/auth");
const findEmailAccount = require("./auth/accounts");
const findAccountById = require("./auth/currentuser");

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
require("./auth/signup")(passport, models.User);
// Load the local-signin strategy from passport
require("./auth/signin")(passport, models.User);

// API routes
app.post("/signup", auth(passport, "local-signup"), (req, res) => {
  res.status(200).json({ user: req.user });
});

app.post("/signin", auth(passport, "local-signin"), (req, res) => {
  res.status(200).json({ user: req.user });
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(204);
});

app.get("/account/:email", findEmailAccount(models.User));

app.get("/findUserById/:id", findAccountById(models.User));

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
