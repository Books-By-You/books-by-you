const bookReviewMongoose = require('mongoose');

const bookReviewSchema = bookReviewMongoose.Schema(
  {
    _id: bookReviewMongoose.Schema.Types.ObjectId,
    bookID: bookReviewMongoose.Schema.Types.ObjectId,
    content: String,
    userID: bookReviewMongoose.Schema.Types.ObjectId,
    date: String
  },
  {
    collection: 'Book-Reviews',
  }
);

module.exports = bookReviewMongoose.model('Book-Review', bookReviewSchema);
