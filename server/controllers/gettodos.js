module.exports = (user, todos) => {
  const User = user;
  const Todos = todos;

  return (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        // If the user ID is found, send back the user
        if (user) {
          Todos.findAll({
            where: {
              UserId: req.params.id,
            },
          }).then((todos) => {
            res.status(200).json({ todos: todos });
          });
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => console.log("Error:", err));
  };
};
