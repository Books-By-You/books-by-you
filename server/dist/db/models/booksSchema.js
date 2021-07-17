const bookMongoose = require('mongoose');
const booksSchema = bookMongoose.Schema({
    _id: bookMongoose.Schema.Types.ObjectId,
    title: String,
    authorID: bookMongoose.Schema.Types.ObjectId,
    description: String,
    coverImage: String,
    tags: { type: [String], default: [] },
    chapters: { type: [{
                _id: bookMongoose.Schema.Types.ObjectId,
                title: String,
                content: String,
                number: Number,
            }], default: [] },
    isPublished: Boolean
}, {
    collection: "Books"
});
module.exports = bookMongoose.model('Book', booksSchema);
//# sourceMappingURL=booksSchema.js.map