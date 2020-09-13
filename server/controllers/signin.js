const bCrypt = require("bcryptjs");

module.exports = (passport, user) => {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      (req, email, password, done) => {
        // Hash the password provided by the user
        const isValidPassword = (userpassword, password) =>
          bCrypt.compareSync(password, userpassword);
        // Find the user by email sent in the POST request
        User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            // If the user is found, return done to move on to the next action
            if (!user) {
              return done(null, false);
            }
            // Check if the password is valid
            if (!isValidPassword(user.password, password)) {
              // If the password length is less than 8, send the message to the client
              if (password.length < 8 || !password.length) {
                return done(null, false, {
                  message: "Password must be atleast 8 characters.",
                });
                // Else, the password is invalid - send the error to the client
              } else {
                return done(null, false, {
                  message: "Invalid password or username.",
                });
              }
            }

            const userObject = user.get();
            return done(null, userObject);
          })
          .catch((err) => console.log("Error:", err));
      }
    )
  );
};
