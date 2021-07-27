const bcrypt = require('bcryptjs');
const User3 = require('../db/models/userSchema');

module.exports = {
  getUser: async (req, res) => {
    const { id } = req.params;

    await User3.findOne({ _id: id })
      .then((user) => {
        if (user) {
          let foundUser = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.profileImage,
            books: user.books,
            authors: user.authors,
            isAuthor: user.isAuthor,
            patreonLink: user.patreonLink,
          };

          res.status(200).send(foundUser);
          return;
        } else {
          res.sendStatus(400);
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(400);
      });
  },
  updateUser: async (req, res) => {
    const { id: userId } = req.params;
    const { username, password, profileImage } = req.body;

    const foundUser = await User3.findById(userId)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        res.sendStatus(404);
      });

    if (password) {
    }

    const updatedUser = {
      profileImage: profileImage || foundUser.profileImage,
      username: username || foundUser.username,
      password: password || foundUser.password,
    };
  },
};
