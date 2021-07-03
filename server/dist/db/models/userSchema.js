const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    passwordHash: String,
    firstName: String,
    lastName: String,
    email: String,
    profileImage: String,
    books: { type: [mongoose.Types.ObjectId], default: [] },
    authors: { type: [mongoose.Types.ObjectId], default: [] },
    isAuthor: { type: Boolean, default: false },
    patreonLink: { type: String, default: null }
}, {
    collection: "Users"
});
module.exports = mongoose.model('User', userSchema);
// books: {type: [{
//   _id: mongoose.Types.ObjectId, 
//   title: String, 
//   authorId: mongoose.Types.ObjectId, 
//   description: String, 
//   coverImage: String, 
//   tags: {type: [String], default: []}, 
//   chapters:  {type: [{
//     _id: mongoose.Types.ObjectId,
//     content: String,
//     number: Number,
// }], default: []},
//# sourceMappingURL=userSchema.js.map