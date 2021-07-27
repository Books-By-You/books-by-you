require('dotenv').config({ path: '../.env' });
import mongoose from 'mongoose';
import { combineReducers } from 'redux';
const User2 = require('../db/models/userSchema');
const Book = require('../db/models/booksSchema');

module.exports = {
  addToBookshelf: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    let foundUser = await User2.findOne({ _id: userId })
      .then((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (foundUser) {
      foundUser.books.push(id);
      let userUpdated = await foundUser.save();
      if (userUpdated) {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  },
  // getBookshelf: async (req, res) => {
  //   const { id } = req.params;
  //   let foundUser = await User2.findOne({ _id: id })
  //     .then((user) => {
  //       if (user) {
  //         return user;
  //       } else {
  //         return null;
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return null;
  //     });

  //   if (foundUser) {
  //     res.status(200).send(foundUser.books);
  //   } else {
  //     res.sendStatus(400);
  //   }
  // },
  getBookshelf: async (req, res) => {
    const { id } = req.params;
    let foundUser = await User2.findOne({ _id: id })
      .then((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (foundUser) {
      let getBooks = foundUser.books.map(
        async (bookId) =>
          await Book.findOne({ _id: bookId }).then((book) =>
            Promise.resolve(book)
          )
      );

      console.log(getBooks);
      res.status(200).send(getBooks);
    } else {
      res.sendStatus(400);
    }
  },
  removeFromBookshelf: async (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let foundUser = await User2.findOne({ _id: userID })
      .then((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (foundUser) {
      let foundIndex = -1;
      for (let i = 0; i < foundUser.books.length; i++) {
        if (foundUser.books[i].toString() === id) {
          foundIndex = i;
        }
      }
      if (foundIndex >= 0) {
        foundUser.books.splice(foundIndex, 1);
        let userUpdated = await foundUser.save();
        if (userUpdated) {
          res.sendStatus(200);
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(400);
    }
  },
};
