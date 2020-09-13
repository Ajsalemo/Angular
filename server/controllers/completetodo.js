module.exports = (user, todos) => {
  const User = user;
  const Todos = todos;

  return (req, res) => {
    User.findOne({
      where: {
        id: req.body.userId,
      },
    })
      .then((user) => {
        // If the user ID is found, send back the user
        if (user) {
          Todos.update(
            {
              completed: req.body.completed,
            },
            {
              where: {
                UserId: req.body.userId,
                id: req.body.todoId,
              },
            }
          ).then((todo) => {
            if (todo) {
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
