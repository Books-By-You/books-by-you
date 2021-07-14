const bookRatingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookID: String,
    userID: String,
    rating: Number
}, {
    collection: "Book Ratings"
});
module.exports = mongoose.model('BookRatings', bookRatingsSchema);
//# sourceMappingURL=bookRatingsSchema.js.map