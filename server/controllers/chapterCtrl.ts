require("dotenv").config({ path: "../.env" });
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
    // let savedChapter = await chapter.save();
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
          _id: id
        },
        {
          title:  foundBook.title,
          authorID:  foundBook.authorID,
          description: foundBook.description,
          coverImage:  foundBook.coverImage,
          isPublished: false,
          chapters: foundBook.chapters,
        }
      );
      res.sendStatus(200);
      console.log(addedChapter);
      return;
    }
    else{
      res.status(400).send("Unable to add Chapter")
    }
  },
};
