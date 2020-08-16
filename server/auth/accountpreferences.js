module.exports = (user) => {
  const User = user;

  return (req, res) => {
    console.log(req.body.accountPreferences);
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
    );
  };
};
