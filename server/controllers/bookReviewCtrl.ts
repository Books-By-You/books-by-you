const BookReview = require("../db/models/bookReviewSchema");
import mongoose from "mongoose";

module.exports = {
  getBookReviews: async (req, res) => {
    const { id } = req.params;
    const bookReviews = await BookReview.find({ bookID: id }).exec();
    if (bookReviews.length > 0) {
      res.status(200).send(bookReviews);
      return;
    } else {
      return res.status(200).send([]);
    }
    res.status(400).send("Unable to find reviews for this book.");
  },
  getBookReviewsForUser: async (req, res) => {
    const { id } = req.params;
    const bookReviews = await BookReview.find({ userID: id }).exec();
    if (bookReviews.length > 0) {
      res.status(200).send(bookReviews);
      return;
    } else {
      return res.status(200).send([]);
    }
    res.status(400).send("Unable to find reviews for this user.");
  },
  addBookReview: async (req, res) => {
    const { userID, review, bookID } = req.body;

    const newBookReview = new BookReview({
      _id: new mongoose.Types.ObjectId(),
      bookID: bookID,
      content: review,
      userID: userID,
      date: new Date(),
    });

    let savedReview = await newBookReview.save();
    if (savedReview) {
      res.status(201).send(savedReview);
      return;
    }
    res.status(400).send("unable to save review");
  },
  updateBookReview: async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;

    let foundReview = await BookReview.findOne({ _id: id })
      .then((book) => {
        if (book) {
          return book;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });

    if (foundReview) {
      const updatedReview = await BookReview.updateOne(
        { _id: id },
        {
          content: review,
        }
      );

      if (updatedReview) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Book review not updated");
      }
    } else {
      res.status(400).send("Book review not updated");
    }
  },
  deleteBookReview: async (req, res) => {
    const { id } = req.params;
    let deleteBookReview = await BookReview.deleteOne({ _id: id }).then(
      (bookRev) => {
        if (bookRev) {
          res.sendStatus(200);
          return;
        } else {
          res.status(400).send("Unable to find book review!");
        }
      }
    );
  },
};
