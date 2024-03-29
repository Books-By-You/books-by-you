import express from 'express';
require('dotenv').config({ path: '../.env' });
const session = require('express-session');
const authCtrl = require('./controllers/authCtrl');
const bookshelfCtrl = require('./controllers/bookshelfCtrl');
const bookCtrl = require('./controllers/bookCtrl');
const userCtrl = require('./controllers/userCtrl');
const chapterCtrl = require('./controllers/chapterCtrl');
const bookRatingsCtrl = require('./controllers/bookRatingsController');
const bookReviewCtrl = require('./controllers/bookReviewCtrl');
const mongoose = require('mongoose');
const cloudinaryUpload = require('./controllers/cloudinaryUpload');
const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();
const mongoController = require('./db/mongoController');

// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    rejectUnauthorized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
    secret: SESSION_SECRET,
  })
);

const user = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;
const cluster = 'books-by-you.stwxg';

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/Books-By-You?retryWrites=true&w=majority`;

mongoose.connect(url);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));

//Auth Endpoints - maybe temporary pending passport w/Oauth implementation
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.delete('/api/auth/logout', authCtrl.logout);
app.post('/api/auth/delete', authCtrl.delete);

//User Endpoints
app.get('/api/users/:id', userCtrl.getUser);
app.put('/api/users/:id', userCtrl.updateUser);

//Book Endpoints
app.post('/api/book', bookCtrl.createBook);
app.put('/api/book/:id', bookCtrl.updateBook);
app.get('/api/books', bookCtrl.getAllBooks);
app.get('/api/book/:id', bookCtrl.getBook);
app.get('/api/booksbyauthor/:id', bookCtrl.getBooksByAuthorId);
app.get('/api/chaptercount/:id', bookCtrl.getChapterCount);
app.delete('/api/book/:id', bookCtrl.deleteBook);

//Bookshelf Endpoints
app.post('/api/bookshelf/:id', bookshelfCtrl.addToBookshelf);
app.get('/api/bookshelf/:id', bookshelfCtrl.getBookshelf);
app.get('/api/bookshelfbooks/:id', bookshelfCtrl.getBooksFromBookshelf);
app.post('/api/bookshelf/remove/:id', bookshelfCtrl.removeFromBookshelf);

//Chapter Endpoints
app.post('/api/chapter', chapterCtrl.addChapter);
app.put('/api/chapter/:id', chapterCtrl.updateChapter);
app.get('/api/chapter/:id', chapterCtrl.getChapter);
app.delete('/api/chapter/:id', chapterCtrl.deleteChapter);

//Cloudinary Endpoint
app.post('/api/upload', cloudinaryUpload.addImage);

//Book Reviews Endpoints
app.get('/api/bookreview/:id', bookReviewCtrl.getBookReviews); // gets book reviews for given book
app.get('/api/bookreviewbyuser/:id', bookReviewCtrl.getBookReviewsForUser); // gets book reviews for given user
app.post('/api/bookreview', bookReviewCtrl.addBookReview);
app.put('/api/bookreview/:id', bookReviewCtrl.updateBookReview);
app.delete('/api/bookreview/:id', bookReviewCtrl.deleteBookReview);

//Book Ratings Endpoints
app.get('/api/bookrating/:id', bookRatingsCtrl.getBookRatings);
app.post('/api/bookrating/:id', bookRatingsCtrl.addBookRating);
app.put('/api/bookrating/:id', bookRatingsCtrl.updateBookRating);
app.delete('/api/bookrating/:id', bookRatingsCtrl.deleteBookRating);

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
