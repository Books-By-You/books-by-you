const ratingsMongoose = require('mongoose');
const bookRatingsSchema = ratingsMongoose.Schema({
    _id: ratingsMongoose.Schema.Types.ObjectId,
    bookID: String,
    userID: String,
    rating: Number
}, {
    collection: "Book Ratings"
});
module.exports = ratingsMongoose.model('BookRatings', bookRatingsSchema);
//# sourceMappingURL=bookRatingsSchema.js.map