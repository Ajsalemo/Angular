// Function to process authentication
const auth = (passport, authType) => {
  return (req, res, next) => {
    passport.authenticate(authType, (error, user, info) => {
      if (error) res.status(400).json({ message: error });
      // Throw a HTTP unauthorized if they try to sign in with an invalid password
      if (!user && authType === "local-signin") res.status(401).json(info);
      // Throw a HTTP bad request if a user tries to create an account with an existing email
      if (!user && authType === "local-signup") res.status(400).json(info);
      req.login(user, (error) => {
        if (error) return next(error);
        next();
      });
    })(req, res, next);
  };
};

module.exports = auth;
