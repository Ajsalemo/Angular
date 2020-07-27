module.exports = (user) => {
  const User = user;

  return (req, res) => {
    // Search for the user by pulling the email of the params on the GET request
    User.findOne({
      where: {
        email: req.params.email,
      },
    }).then((user) => {
      // Whether or not a user exists, send back the user object
      // Logic is used to compare the response returned from Postgres to check if this email is already in use
      if (user || !user) {
        res.status(200).json({ user: user });
      }
    });
  };
};
