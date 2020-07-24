"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var session = require("express-session");
var passport = require("passport");
var bodyParser = require("body-parser");
var morgan = require("morgan");
// Set the stategy to 'Local'
var LocalStrategy = require("passport-local").Strategy;
// Initialize express
var app = express();
// Set the port
var port = process.env.PORT || 3000;
// Currently the username and password is hardcoded
passport.use(new LocalStrategy(function (username, password, done) {
    if (username === "admin" && password === "admin@admin.com") {
        return done(null, username);
    }
    else {
        return done("unauthorized access", false);
    }
}));
// Serialize and deserialize the user
passport.serializeUser(function (user, done) {
    if (user)
        done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
app.use(session({ secret: "anything", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// Function to process authentication
var auth = function () {
    return function (req, res, next) {
        passport.authenticate("local", function (error, user, info) {
            if (error)
                res.status(400).json({ message: error });
            req.login(user, function (error) {
                if (error)
                    return next(error);
                next();
            });
        })(req, res, next);
    };
};
app.post("/authenticate", auth(), function (req, res) {
    res.status(200).json({ user: req.user });
});
app.listen(port, function () {
    console.log("Server is listening on port: " + port);
});
