import mongoose from 'mongoose';
import { Request, Response } from 'express';

const Book = require('../db/models/booksSchema');

module.exports = {
  getBookRatings: async (req: Request, res: Response) => {
    const { id } = req.params;

    const bookRatings = await Book.findOne({ _id: id })
      .then((response) => {
        const { ratingCount, ratingAggregate } = response;
        const average = ratingAggregate / ratingCount;
        return average;
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(404);
      });

    if (bookRatings) {
      return res.status(200).send({ rating: bookRatings });
    }
    return res.status(400).send('No rating found');
  },
  addBookRating: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating } = req.body;

    const foundBook = await Book.findOne({ _id: id })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(404);
      });

    if (!foundBook) {
      return res.sendStatus(404);
    }

    if (foundBook.ratingCount || foundBook.ratingAggregate) {
      return res.status(400).send('Rating already exists');
    }

    foundBook.ratingCount = 1;
    foundBook.ratingAggregate = rating;

    await foundBook.save();
    return res
      .status(200)
      .send(`Rating of ${rating} for ${foundBook.title} has been added.`);
  },
};
