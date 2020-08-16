module.exports = (user) => {
  const User = user;

  return (req, res) => {
    // Search for the user by pulling the ID of the params on the GET request
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        // If the user ID is found, send back the user
        if (user) {
          res.status(200).json({ user: user });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => console.log("Error:", err));
  };
};
