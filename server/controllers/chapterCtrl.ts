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
  updateChapter: async (req, res) => {
    const { id } = req.params; 
    const { content, number, title, chapter_id } = req.body;

    let foundBook = await Book.findOne({ _id: id })
      .then((book) =>{
        if(book){
          return book;
        }
          else{
            return null;
          }
        }
      )
      .catch((err) => {
        console.log(err);
        return null;
      });

      if(foundBook){
        let chapterIndex = foundBook.chapters.findIndex((chapter) => {
          console.log(chapter._id)
          console.log(chapter_id)
          return chapter._id == chapter_id
          
        })

        console.log(chapterIndex)

        let chapterToUpdate = {
          _id: foundBook.chapters[chapterIndex]._id,
          title: title || foundBook.chapters[chapterIndex].title,
          number: number || foundBook.chapters[chapterIndex].number,
          content: content || foundBook.chapters[chapterIndex].content
        }

        foundBook.chapters.splice(chapterIndex, 1, chapterToUpdate)

        
        console.log(foundBook.chapters)


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
      }
  },

};
