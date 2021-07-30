require("dotenv").config({ path: "../.env" });
import e from "express";
import mongoose from "mongoose";
const Book = require("../db/models/booksSchema");

module.exports = {
  addChapter: async (req, res) => {
    const { content, title, id } = req.body;
    console.log("Hitting add chapter", { id });

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
      const chapterNumber = (foundBook.chapters.length + 1) || 1;
      const chapter = {
        _id: new mongoose.Types.ObjectId(),
        title: title,
        content: content,
        number: chapterNumber,
      };

      if (!chapter || !title || !content || !chapter.number) {
        return res.sendStatus(400);
      }
      foundBook.chapters.push(chapter);

      try {
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
        return res.status(200).send(foundBook);
      } catch (err) {
        console.log("Hit Book.updateOne() err case", err)
        return res.sendStatus(500)
      }
    } else {
      return res.status(400).send("Unable to add Chapter");
    }
  },
  
  updateChapter: async (req, res) => {
    console.log("Hitting update chapter")
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
    console.log("Hitting getChapter")
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
    console.log("Hitting deleteChapter")
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
