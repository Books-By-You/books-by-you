require("dotenv").config({ path: "../.env" });
import e from "express";
import mongoose from "mongoose";
const Book = require("../db/models/booksSchema");

module.exports = {
  addChapter: async (req, res) => {
    const { content, number, title, id } = req.body;
    const chapter = {
      _id: new mongoose.Types.ObjectId(),
      title: title,
      content: content,
      number: number,
    };

    console.log("Hitting add chapter");
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
      foundBook.chapters.push(chapter);
      let addedChapter = await Book.updateOne(
        {
          _id: id,
        },
        {
          title: foundBook.title,
          authorID: foundBook.authorID,
          description: foundBook.description,
          coverImage: foundBook.coverImage,
          isPublished: false,
          chapters: foundBook.chapters,
        }
      );
      res.sendStatus(200);
      console.log(addedChapter);
      return;
    } else {
      res.status(400).send("Unable to add Chapter");
    }
  },
  updateChapter: async (req, res) => {
    const { id } = req.params;
    const { content, number, title, chapter_id } = req.body;

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
      let chapterIndex = foundBook.chapters.findIndex((chapter) => {
        console.log(chapter._id);
        console.log(chapter_id);
        return chapter._id == chapter_id;
      });

      console.log(chapterIndex);
      if (chapterIndex === -1) {
        res.status(400).send("Chapter not found");
      }
      let chapterToUpdate = {
        _id: foundBook.chapters[chapterIndex]._id,
        title: title || foundBook.chapters[chapterIndex].title,
        number: number || foundBook.chapters[chapterIndex].number,
        content: content || foundBook.chapters[chapterIndex].content,
      };

      foundBook.chapters.splice(chapterIndex, 1, chapterToUpdate);

      console.log(foundBook.chapters);

      const updatedChapter = await Book.updateOne(
        { _id: id },
        {
          title: foundBook.title,
          authorID: foundBook.authorID,
          description: foundBook.description,
          coverImage: foundBook.CoverImage,
          tags: foundBook.tags,
          chapters: foundBook.chapters,
          isPublished: false,
        }
      );

      if (updatedChapter) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Chapter not updated");
      }
    } else {
      res.status(400).send("Book not found");
    }
  },
  getChapter: async (req, res) => {
    const { id } = req.params;
    const { chapter_id } = req.body;
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
      let chapterIndex = foundBook.chapters.findIndex((chapter) => {
        return chapter._id == chapter_id;
      });
      console.log(chapterIndex);
      if (chapterIndex === -1) {
        res.status(400).send("Chapter not found");
      }
      let chapterToFind = {
        _id: foundBook.chapters[chapterIndex]._id,
        title: foundBook.chapters[chapterIndex].title,
        number: foundBook.chapters[chapterIndex].number,
        content: foundBook.chapters[chapterIndex].content,
      };

      res.status(201).send(chapterToFind);
    } else {
      res.status(400).send("Book not found");
    }
  },
  deleteChapter: async (req, res) => {
    const { id } = req.params;
    const { chapter_id } = req.body;
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
      let chapterIndex = foundBook.chapters.findIndex((chapter) => {
        return chapter._id == chapter_id;
      });
      if (chapterIndex === -1) {
        res.status(400).send("Chapter not found");
      }

      console.log(chapterIndex);

      foundBook.chapters.splice(chapterIndex, 1);

      const deletedChapter = await Book.updateOne(
        { _id: id },
        {
          title: foundBook.title,
          authorID: foundBook.authorID,
          description: foundBook.description,
          coverImage: foundBook.CoverImage,
          tags: foundBook.tags,
          chapters: foundBook.chapters,
          isPublished: false,
        }
      );

      if (deletedChapter) {
        res.sendStatus(200);
      } else {
        res.status(400).send("Chapter not deleted");
      }
    } else {
      res.status(400).send("Book not found");
    }
  },
};
