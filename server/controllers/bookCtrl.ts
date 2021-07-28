require('dotenv').config({ path: '../.env' });
import mongoose from 'mongoose';
const Book = require('../db/models/booksSchema');

module.exports = {
  createBook: async (req, res) => {
    const { title, authorID, description, coverImage, tag } = req.body;
    console.log("getting here")
    console.log(req.body)
    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      authorID: authorID,
      description: description,
      coverImage: coverImage,
      tags: tag,
      isPublished: false,
    });
    let savedBook = await book.save();
    if (savedBook) {
      res.status(201).send(savedBook);
      return;
    }
    res.status(400).send('unable to save book');
  },
  getBook: async (req, res) => {
    const { id } = req.params;
    console.log(id)
    let foundBook = await Book.findOne({ _id: id })
      .then((book) => {
        if (book) {
          console.log('here 1')
          return book;
        } else {
          console.log('here 2')
          return null;
        }
      })
      .catch((err) => {
        return err;
      });
    console.log(foundBook)
    if (foundBook) {
      res.status(200).send(foundBook);
      return;
    } else {
      res.status(400).send('Unable to find Book!');
    }
  },
  getChapterCount: async (req, res) => {
    const { id } = req.params;

    let foundBook = await Book.findOne({ _id: id })
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

    if (foundBook) {
      res.json(foundBook.chapters.length);
    } else {
      res.sendStatus(400);
    }
  },
  deleteBook: async (req, res) => {
    const { id } = req.params;
    let deleteBook = await Book.deleteOne({ _id: id }).then((book) => {
      if (book) {
        res.sendStatus(200);
        return;
      } else {
        res.status(400).send('Unable to find Book!');
      }
    });
  },

  updateBook: async (req, res) => {
    const { id } = req.params;
    const { title, authorID, description, coverImage, tag } = req.body;

    let foundBook = await Book.findOne({ _id: id })
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

    if (foundBook) {
       
      let bookToUpdate = {
        title: foundBook.title,
        authorID: foundBook.authorID,
        coverImage: foundBook.coverImage,
        description: foundBook.description,
        tags: foundBook.tags
      };

      const updatedBook = await Book.updateOne(
        { _id: id },
        {
          title: title || bookToUpdate.title,
          authorID: authorID || bookToUpdate.authorID,
          description: description || bookToUpdate.description,
          coverImage: coverImage || bookToUpdate.coverImage,
          tags: tag || bookToUpdate.tags,
          isPublished: false,
        }
      );

      if (updatedBook) {
        res.sendStatus(200);
      } else {
        res.status(400).send('Book not updated');
      }
    }
  },

  getAllBooks: async (req, res) => {
    let getBooks = await Book.find();
    if (getBooks) {
      res.status(201).send(getBooks);
      return;
    }
    res.status(400).send('unable to get books');
  },
};
