module.exports = (user) => {
  const User = user;

  return (req, res) => {
    User.findOne({
      where: {
        id: req.body.id,
      },
    })
      .then((user) => {
        // If the user ID is found, send back the user
        if (user) {
          User.update(
            {
              username: req.body.username,
            },
            {
              where: {
                id: req.body.id,
              },
            }
          ).then((username) => {
            if (username) {
              res.sendStatus(204);
            }
          });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => console.log("Error:", err));
  };
};
