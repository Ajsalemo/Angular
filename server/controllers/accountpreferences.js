module.exports = (user) => {
  const User = user;

  return (req, res) => {
    const getUpdatedAccountPreferences = req.body.accountPreferences;
    User.update(
      {
        showLinks: getUpdatedAccountPreferences.links,
        showSearch: getUpdatedAccountPreferences.search,
        showWeather: getUpdatedAccountPreferences.weather,
        showTodo: getUpdatedAccountPreferences.todo,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(() => {
        User.findOne({
          where: {
            id: req.body.id,
          },
        }).then((user) => {
          if (user) {
            const returnedAccountPreferences = {
              updatedLinks: user.showLinks,
              updatedSearch: user.showSearch,
              updatedWeather: user.showWeather,
              updatedTodo: user.showTodo,
            };
            res.status(200).json({ user: returnedAccountPreferences });
          } else {
            res.sendStatus(404);
          }
        });
      })
      .catch((err) => console.log(("Error", err)));
  };
};
