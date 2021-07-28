"use strict";
// import express from "express";
// require("dotenv").config({ path: "../.env" });
// const session = require("express-session");
// const authCtrl = require("./controllers/authCtrl");
// const bookshelfCtrl = require("./controllers/bookshelfCtrl");
// const bookCtrl = require("./controllers/bookCtrl")
// const userCtrl = require("./controllers/userCtrl")
// const chapterCtrl = require("./controllers/chapterCtrl")
// const cloudinaryUpload = require("./controllers/cloudinaryUpload")
// const mongoose = require("mongoose");
// const { SERVER_PORT, SESSION_SECRET } = process.env;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const e = require("express");
// const app = express();
// const mongoController = require("./db/mongoController");
// app.use(e.json({ limit: '50mb'}))
// app.use(e.urlencoded({ limit: '50mb', extended:true}));
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     rejectUnauthorized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
//     secret: SESSION_SECRET,
//   })
// );
// const user = process.env.MONGO_USER;
// const userPassword = process.env.MONGO_PASSWORD;
// const cluster = "books-by-you.stwxg";
// const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/Books-By-You?retryWrites=true&w=majority`;
// mongoose.connect(url);
// app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
// //Auth Endpoints - maybe temporary pending passport w/Oauth implementation
// app.post("/api/auth/register", authCtrl.register);
// app.post("/api/auth/login", authCtrl.login);
// app.delete("/api/auth/logout", authCtrl.logout);
// app.post("/api/auth/delete", authCtrl.delete);
// //User Endpoints
// app.get('/api/users/:id', userCtrl.getUser)
// //Book Endpoints
// app.post('/api/book', bookCtrl.createBook)
// app.put ('/api/book/:id', bookCtrl.updateBook)
// app.get('/api/books', bookCtrl.getAllBooks)
// app.get('/api/book/:id', bookCtrl.getBook)
// app.get('/api/chaptercount/:id', bookCtrl.getChapterCount)
// app.delete('/api/book/:id', bookCtrl.deleteBook)
// //Bookshelf Endpoints
// app.post('/api/bookshelf/:id', bookshelfCtrl.addToBookshelf)
// app.get('/api/bookshelf/:id', bookshelfCtrl.getBookshelf)
// app.post('/api/bookshelf/remove/:id', bookshelfCtrl.removeFromBookshelf)
// //Chapter Endpoints
//  app.post('/api/chapter', chapterCtrl.addChapter)
//  app.put('/api/chapter/:id', chapterCtrl.updateChapter)
//  app.post('/api/chapter/:id', chapterCtrl.getChapter)
//  app.delete('/api/chapter/:id', chapterCtrl.deleteChapter)
//  //Cloudinary Upload Endpoint
// //  app.post('/api/upload', (req, res) => {
// //    try {
// //      const fileStr = req.body.data;
// //      console.log(fileStr);
// //    } catch (error) {
// //         console.log(error);
// //    }
// //  }
// //Book Reviews Endpoints
// // app.get('/api/bookreview/:id', bookReviewCtrl.getBookReviews)
// // app.post('/api/bookreview', bookReviewCtrl.addBookReview)
// // app.put ('/api/bookreview', bookReviewCtrl.updateBookReview)
// // app.delete('/api/bookreview/:id', bookReviewCtrl.deleteBookReview)
// //Chapter Reveiws Endpoints
// // app.get('/api/chapterreview/:id', chapterReviewCtrl.getChapterReviews)
// // app.post('/api/chapterreview', chapterReviewCtrl.addChapterReview)
// // app.put('/api/chapterreview', chapterReviewCtrl.updateChapterReview)
// // app.delete('/api/chapterreview/:id', chapterReviewCtrl.deleteChapterReview)
// //Book Ratings Endpoints
// // app.get('/api/bookrating/:id', bookRatingsCtrl.getBookRatings)
// // app.post('/api/bookrating', bookRatingsCtrl.addBookRating)
// // app.delete('/api/bookrating/:id', bookRatingsCtrl.deleteBookRating)
// // app.put('/api/bookrating', bookRatingsCtrl.updateBookRating)
// //Chapter Ratings Endpoints
// // app.get('/api/chapterrating/:id', chapterRatingsCtrl.getChapterRatings)
// // app.post('/api/chapterrating', chapterRatingsCtrl.addChapterRating)
// // app.delete('/api/chapterrating/:id', chapterRatingsCtrl.deleteChapterRating)
// // app.put('/api/chapterrating', chapterRatingsCtrl.updateChapterRating)
// //Follow Author Endpoints
// // app.post('/api/followauthor', followAuthorCtrl.followAuthor)
// // app.post('/api/followauthor', followAuthorCtrl.unfollowAuthor)
const express_1 = __importDefault(require("express"));
require("dotenv").config({ path: "../.env" });
const session = require("express-session");
const authCtrl = require("./controllers/authCtrl");
const bookshelfCtrl = require("./controllers/bookshelfCtrl");
const bookCtrl = require("./controllers/bookCtrl");
const userCtrl = require("./controllers/userCtrl");
const chapterCtrl = require("./controllers/chapterCtrl");
const cloudinaryUpload = require("./controllers/cloudinaryUpload");
const mongoose = require("mongoose");
const { SERVER_PORT, SESSION_SECRET } = process.env;
const app = express_1.default();
const mongoController = require("./db/mongoController");
// app.use(express.json());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    secret: SESSION_SECRET,
}));
const user = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;
const cluster = "books-by-you.stwxg";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/Books-By-You?retryWrites=true&w=majority`;
mongoose.connect(url);
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
//Auth Endpoints - maybe temporary pending passport w/Oauth implementation
app.post("/api/auth/register", authCtrl.register);
app.post("/api/auth/login", authCtrl.login);
app.delete("/api/auth/logout", authCtrl.logout);
app.post("/api/auth/delete", authCtrl.delete);
//User Endpoints
app.get("/api/users/:id", userCtrl.getUser);
//Book Endpoints
app.post("/api/book", bookCtrl.createBook);
app.put("/api/book/:id", bookCtrl.updateBook);
app.get("/api/books", bookCtrl.getAllBooks);
app.get("/api/book/:id", bookCtrl.getBook);
app.get("/api/chaptercount/:id", bookCtrl.getChapterCount);
app.delete("/api/book/:id", bookCtrl.deleteBook);
//Bookshelf Endpoints
app.post("/api/bookshelf/:id", bookshelfCtrl.addToBookshelf);
app.get("/api/bookshelf/:id", bookshelfCtrl.getBookshelf);
app.post("/api/bookshelf/remove/:id", bookshelfCtrl.removeFromBookshelf);
//Chapter Endpoints
app.post("/api/chapter", chapterCtrl.addChapter);
app.put("/api/chapter/:id", chapterCtrl.updateChapter);
app.post("/api/chapter/:id", chapterCtrl.getChapter);
app.delete("/api/chapter/:id", chapterCtrl.deleteChapter);
//Cloudinary Endpoint
app.post("/api/upload", cloudinaryUpload.addImage);
//Book Reviews Endpoints
// app.get('/api/bookreview/:id', bookReviewCtrl.getBookReviews)
// app.post('/api/bookreview', bookReviewCtrl.addBookReview)
// app.put ('/api/bookreview', bookReviewCtrl.updateBookReview)
// app.delete('/api/bookreview/:id', bookReviewCtrl.deleteBookReview)
//Chapter Reveiws Endpoints
// app.get('/api/chapterreview/:id', chapterReviewCtrl.getChapterReviews)
// app.post('/api/chapterreview', chapterReviewCtrl.addChapterReview)
// app.put('/api/chapterreview', chapterReviewCtrl.updateChapterReview)
// app.delete('/api/chapterreview/:id', chapterReviewCtrl.deleteChapterReview)
//Book Ratings Endpoints
// app.get('/api/bookrating/:id', bookRatingsCtrl.getBookRatings)
// app.post('/api/bookrating', bookRatingsCtrl.addBookRating)
// app.delete('/api/bookrating/:id', bookRatingsCtrl.deleteBookRating)
// app.put('/api/bookrating', bookRatingsCtrl.updateBookRating)
//Chapter Ratings Endpoints
// app.get('/api/chapterrating/:id', chapterRatingsCtrl.getChapterRatings)
// app.post('/api/chapterrating', chapterRatingsCtrl.addChapterRating)
// app.delete('/api/chapterrating/:id', chapterRatingsCtrl.deleteChapterRating)
// app.put('/api/chapterrating', chapterRatingsCtrl.updateChapterRating)
//Follow Author Endpoints
// app.post('/api/followauthor', followAuthorCtrl.followAuthor)
// app.post('/api/followauthor', followAuthorCtrl.unfollowAuthor)
//# sourceMappingURL=index.js.map