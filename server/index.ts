import express from 'express'
require('dotenv').config({path: '../.env'})

const {SERVER_PORT} = process.env

const app = express()

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))

//Auth Endpoints - maybe temporary pending passport w/Oauth implementation
// app.post('/api/auth/register', authCtrl.register);
// app.post('/api/auth/login', authCtrl.login);
// app.delete('/api/auth/logout', authCtrl.logout)
// app.post('/api/auth/delete', authCtrl.delete)

//Book Endpoints 
  // app.post('/api/book', bookCtrl.createBook)
  // app.put ('/api/book/:id', bookCtrl.updateBook)
  // app.get('/api/books', bookCtrl.getAllBooks)
  // app.get('/api/book/:id', bookCtrl.getBook)
  // app.delete('/api/book/:id', bookCtrl.deleteBook)

//Bookshelf Endpoints
  // app.post('/api/bookshelf', bookshelfCtrl.addToBookshelf)
  // app.get('/api/bookshelf', bookshelfCtrl.getBookshelf)
  // app.delete('/api/bookshelf/:id', bookshelfCtrl.removeFromBookshelf)

//Chapter Endpoints
  // app.post('/api/chapter', chapterCtrl.addChapter)
  // app.put('/api/chapter', chapterCtrl.updateChapter)
  // app.get('/api/chapter/:id', chapterCtrl.getChapter)
  // app.get('/api/chaptercount/:id', chapterCtl.getChapterCount)
  // app.delete('/api/chapter/:id', chapterCtrl.deleteChapter)

//Book Reviews Endpoints
  // app.get('/api/bookreview/:id', bookReviewCtrl.getBookReviews)
  // app.post('/api/bookreview', bookReviewCtrl.addBookReview)
  // app.put ('/bookreview/:id', bookReviewCtrl.updateBookReview)
  // app.delete('/api/bookreview/:id', bookReviewCtrl.deleteBookReview)

//Chapter Reveiws Endpoints
  // app.get('/api/chapterreview/:id', chapterReviewCtrl.getChapterReviews)
  // app.post('/api/chapterreview', chapterReviewCtrl.addChapterReview)
  // app.put('/api/chapterreview/:id', chapterReviewCtrl.updateChapterReview)
  // app.delete('/api/chapterreview/:id', chapterReviewCtrl.deleteChapterReview)

//Book Ratings Endpoints
  // app.get('/api/bookrating/:id', bookRatingsCtrl.getBookRatings)
  // app.post('/api/bookrating', bookRatingsCtrl.addBookRating)
  // app.delete('/api/bookrating/:id', bookRatingsCtrl.deleteBookRating)
  // app.put('/api/bookrating/:id', bookRatingsCtrl.updateBookRating)

//Chapter Ratings Endpoints
  // app.get('/api/chapterrating/:id', chapterRatingsCtrl.getChapterRatings)
  // app.post('/api/chapterrating', chapterRatingsCtrl.addChapterRating)
  // app.delete('/api/chapterrating/:id', chapterRatingsCtrl.deleteChapterRating)
  // app.put('/api/chapterrating/:id', chapterRatingsCtrl.updateChapterRating)

//Follow Author Endpoints
  //app.get('/api/followauthor/:id', followAuthorCtrl.followAuthor)
  // app.delete('/api/followauthor/:id', followAuthorCtrl.unfollowAuthor)