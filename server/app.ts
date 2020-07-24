import express = require("express");
import session = require("express-session");
import passport = require("passport");
import bodyParser = require("body-parser");
import morgan = require("morgan");

// Set the stategy to 'Local'
const LocalStrategy = require("passport-local").Strategy;

// Initialize express
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Currently the username and password is hardcoded
passport.use(
  new LocalStrategy((username: string, password: string, done: any): void => {
    if (username === "admin" && password === "admin@admin.com") {
      return done(null, username);
    } else {
      return done("unauthorized access", false);
    }
  })
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
const auth = () => {
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

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
