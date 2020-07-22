const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { auth, isLoggedIn } = require("../passport-auth");

// Initialize express
const app = new express();

// Set the port
const port = process.env.PORT || 3000;

app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(morgan("dev"));

// Check the authentication status
app.get("/check_auth", isLoggedIn, (req, res) => {
  res.json("data is");
});

app.post("/authenticate", auth(), (req, res) => {
  res.status(200).json({ statusCode: 200, user: req.user });
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
