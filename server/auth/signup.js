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
              message: "Email is already in use."
            });
          } else {
            // Else, if so no user, create them
            // Hash the password by passing it to the generateHash function
            const userPassword = generateHash(password);
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
