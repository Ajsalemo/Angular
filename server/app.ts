require("dotenv").config();

import express = require("express");
import session = require("express-session");
import passport = require("passport");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import models from "./models";
// Set the stategy to 'Local'
const LocalStrategy = require("passport-local").Strategy;

// Initialize express
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Currently the username and password is hardcoded
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (username: string, password: string, done: any): void => {
      if (username === "admin@admin.com" && password === "admin") {
        return done(null, username);
      } else {
        return done("unauthorized access", false);
      }
    }
  )
);

// Serialize and deserialize the user
passport.serializeUser((user: string, done: any): void => {
  if (user) done(null, user);
});

passport.deserializeUser((user: string, done: any): void => {
  done(null, user);
});

app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Function to process authentication
const auth = (): any => {
  return (req: any, res: any, next: any) => {
    passport.authenticate("local", (error: string, user: any, info: any) => {
      if (error) res.status(400).json({ message: error });
      req.login(user, (error: string) => {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

app.post("/authenticate", auth(), (req: any, res: any) => {
  res.status(200).json({ user: req.user });
});

// Create and sync the database through Sequelize
models.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Postgres has started and synced");
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err: string) => {
    console.log(err, "Something went wrong with the Database Update!");
  });
