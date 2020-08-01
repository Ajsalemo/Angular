const bCrypt = require("bcryptjs");

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // Hash the password provided by the user
        const generateHash = (password) =>
          bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        // Find the user by email sent in the POST request
        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          // If the user is found, return done to move on to the next action
          if (user) {
            return done(null, false, {
              message: "Email is already in use.",
            });
            // Else, if so no user, create them
          } else {
            // Regex to match the following -
            // 1. Atleast a length of 8
            // 2. Contains atleast one uppercase and lower case letter
            // 3. Contains atleast one number and symbol
            const emailCharValidation = new RegExp(
              '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*d)(?=.*[!#$%&? "]).*$'
            );
            // Hash the password by passing it to the generateHash function
            const userPassword = generateHash(password);
            // If the password length is less than 8 or Regex validation doesn't match, send the error to the client
            if (password.length < 8) {
              return done(null, false, {
                message: "Password must be atleast 8 characters.",
              });
            } else if (emailCharValidation.test(password) === false) {
              return done(null, false, {
                message:
                  "Password must contain atleast one uppercase, lowercase, number and special character.",
              });
            }
            // Putting the form information into a named object
            const data = {
              email: email,
              password: userPassword,
              username: req.body.username,
            };
            // Create the instance of the new user for Postgres
            User.create(data).then((newUser, _) => {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
};
