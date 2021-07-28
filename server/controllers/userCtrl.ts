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
        return res.status(404).send('User not found');
      });

    if (foundUser === null) {
      return res.sendStatus(404);
    }

    if (password) {
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(password, salt);
      foundUser.profileImage = profileImage || foundUser.profileImage;
      foundUser.username = username || foundUser.username;
      foundUser.passwordHash = hash;

      await foundUser
        .save()
        .then((savedDoc) => {
          if (savedDoc === foundUser) {
            return res.status(200).send(foundUser);
          }
        })
        .catch((error) => {
          return res.status(400).send('Failed to complete changes.');
        });
    }

    foundUser.profileImage = profileImage || foundUser.profileImage;
    foundUser.username = username || foundUser.username;

    await foundUser
      .save()
      .then((savedDoc) => {
        if (savedDoc === foundUser) {
          return res.status(200).send(foundUser);
        }
      })
      .catch((error) => {
        return res.status(400).send('Failed to complete changes.');
      });
  },
};
