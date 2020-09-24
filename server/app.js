require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const models = require("./models");
const auth = require("./controllers/auth");
const findEmailAccount = require("./controllers/accounts");
const findAccountById = require("./controllers/currentuser");
const updatePreferences = require("./controllers/accountpreferences");
const addTodo = require("./controllers/posttodos");
const getTodo = require("./controllers/gettodos");
const completeTodo = require("./controllers/completetodo");
const deleteTodo = require("./controllers/deletetodo");

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

// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //
app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// ----------------------------- Load the local-signup strategy from passport ---------------------------------- //
// ----------------------------------------------------------------------------- //
// Load the local-signin strategy from passport
require("./controllers/signup")(passport, models.User);
// Load the local-signin strategy from passport
require("./controllers/signin")(passport, models.User);
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// --------------------------------- API routes ------------------------------------ //
// ----------------------------------------------------------------------------- //
// Sign up route for new users
app.post("/signup", auth(passport, "local-signup"), (req, res) => {
  res.status(200).json({ user: req.user });
});
// Sign in route for existing users
app.post("/signin", auth(passport, "local-signin"), (req, res) => {
  res.status(200).json({ user: req.user });
});
// Update account preferences - aka. show/hide UI elements for the user
app.post("/updatePreferences", updatePreferences(models.User));
// Update nnauthenticated user preferences - aka. show/hide UI elements for the nnauthenticated user
app.post("/unauthenticatedUpdatePreferences", (req, res) => {
  res.status(200).json({ preferences: req.body })
});
// Add a daily task/todo
app.post("/addTodo", addTodo(models.User, models.Todos));
// Complete a daily task/todo
app.post("/completetodo", completeTodo(models.User, models.Todos));
// Delete a daily task/todo
app.post("/deletetodo", deleteTodo(models.User, models.Todos));
// Log out after being authenticated
app.get("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(204);
});
// Get all todos/tasks related to a user
app.get("/getTodo/:id", getTodo(models.User, models.Todos));
// Check against Postgres to see if this email already exsists - find email by params passed in the URL
app.get("/account/:email", findEmailAccount(models.User));
// Check against Postgres to see if this user exists - find id by params passed through the URL
app.get("/findUserById/:id", findAccountById(models.User));
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //

// ----------------------- Sequelize and Express startup ----------------------------------- //
// ----------------------------------------------------------------------------- //
// Create and sync the database through Sequelize
// Afterwards, start the express server
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
// ----------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- //
