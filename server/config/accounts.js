module.exports = (user) => {
  const User = user;

  return (req, res) => {
    // Search for the user by pulling the email of the params on the GET request
    User.findOne({
      where: {
        email: req.params.email,
      },
    }).then((user) => {
      // If user doesn't exist, send back a HTTP 400
      // TODO - change this for better handling of a non-exsitent email
    //   if (!user) {
    //     console.log("User did not exist:" + user);
    //     res.sendStatus(400);
    //   }
      // If the user does exist then send back a HTTP 200 and the email found
      if (user || !user) {
        console.log("User exists:" + user);
        res.status(200).json({ user: user });
      }
    });
  };
};
