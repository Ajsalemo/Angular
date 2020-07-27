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
        const generateHash = (password) =>
          bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          if (user) {
            return done(null, false);
          } else {
            const userPassword = generateHash(password);

            const data = {
              email: email,
              password: userPassword,
              firstname: req.body.name,
            };
            console.log('made it here')
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
