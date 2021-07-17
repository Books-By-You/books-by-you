import mongoose from 'mongoose';
import { Request, Response } from 'express';

const Book = require('../db/models/booksSchema');

module.exports = {
  getBookRatings: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;

    const bookRatings = await Book.findOne({ _id: bookId })
      .then((response) => {
        return response.ratings;
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(404);
      });

    if (bookRatings.length === 0) {
      return res.status(400).send('No rating found');
    }

    const ratingsTotal = bookRatings.reduce((total, bookRating) => {
      return total + bookRating.rating;
    }, 0);
    const averageRating = ratingsTotal / bookRatings.length;
    return res.status(200).send({ rating: averageRating });
  },
  addBookRating: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const { userId, rating } = req.body;

    const foundBook = await Book.findOne({ _id: bookId })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(404);
      });

    const userReview = foundBook.ratings.filter((book) => {
      return book.userId === userId;
    });

    if (userReview[0]?.rating) {
      return res.status(409).send('Rating already exists');
    }

    foundBook.ratings.push({
      userId,
      rating,
    });

    await foundBook
      .save()
      .then((savedDoc) => {
        if (savedDoc === foundBook) {
          return res
            .status(200)
            .send(`Rating of ${rating} for ${foundBook.title} has been added.`);
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).send('Failed to complete changes.');
      });
  },
  updateBookRating: async (req: Request, res: Response) => {
    // Need to store individual user rating in order to update rating
  },
  deleteBookRating: async (req: Request, res: Response) => {
    // Need to store individual user rating in order to delete rating
  },
};
