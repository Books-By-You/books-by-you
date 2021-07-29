import { Request, Response } from 'express';

const Book = require('../db/models/booksSchema');

module.exports = {
  getBookRatings: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;

    const bookRatings = await Book.findById(bookId)
      .then((response) => {
        return response.ratings;
      })
      .catch((error) => {
        console.log(error);
        return res.sendStatus(404);
      });

    const ratingsTotal = bookRatings.reduce((total, bookRating) => {
      return total + bookRating.rating;
    }, 0);
    const averageRating = ratingsTotal / bookRatings.length;
    return res.status(200).send({ rating: averageRating });
  },
  addBookRating: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const { userId, rating } = req.body;

    const foundBook = await Book.findById(bookId)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return res.status(404).send('Book not found');
      });

    const userReview = foundBook?.ratings.filter((book) => {
      return book.userId === userId;
    });

    if (!userReview) {
      return res.sendStatus(404);
    }

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
        return res.status(400).send('Failed to complete changes.');
      });
  },
  updateBookRating: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const { userId, rating } = req.body;

    const foundBook = await Book.findById(bookId)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return res.status(404).send('Book not found');
      });

    const userReview = foundBook.ratings.filter((book) => {
      return book.userId === userId;
    });

    if (userReview.length === 0) {
      return res.sendStatus(404);
    }

    userReview[0].rating = rating;

    await foundBook
      .save()
      .then((savedDoc) => {
        if (savedDoc === foundBook) {
          return res
            .status(200)
            .send(
              `${foundBook.title} has been updated with a rating of ${rating}.`
            );
        }
      })
      .catch((error) => {
        return res.status(400).send('Failed to complete changes.');
      });
  },
  deleteBookRating: async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const { userId } = req.body;

    const result = await Book.update(
      { _id: bookId },
      { $pull: { ratings: { userId: userId } } }
    );
    if (result.nModified === 0) {
      return res.status(400).send('Could not complete your request.');
    }
    return res.status(200).send(`Deleted rating.`);
  },
};
