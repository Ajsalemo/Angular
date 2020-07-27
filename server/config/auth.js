// Function to process authentication
const auth = (passport) => {
  return (req, res, next) => {
    passport.authenticate("local-signup", (error, user, _) => {
      if (error) res.status(400).json({ message: error });
      req.login(user, (error) => {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

module.exports = auth;