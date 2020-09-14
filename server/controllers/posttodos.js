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
          const data = {
            todoName: req.body.todoName,
            UserId: req.body.userId,
          };
          // If the todo/task in the request doesn't exist or is empty send a HTTP 400 - bad request
          if (!data || !data.todoName || data.todoName.length < 0) {
            res.status(400).json({ message: "Field cannot be empty" });
          } else {
            Todos.create(data).then((newTodo) => {
              if (newTodo) {
                // If a task/todo has been submitted, send back a HTTP 204 - OK(no content - prevents a parsing error from Angular)
                res.sendStatus(204);
              }
            });
          }
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => console.log("Error:", err));
  };
};
