const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    passwordHash: String,
    firstName: String,
    lastName: String,
    email: String,
    profileImage: String,
    books: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    authors: { type: [mongoose.SchemaTypes.ObjectId], default: [] },
    isAuthor: { type: Boolean, default: false },
    patreonLink: { type: String, default: null }
}, {
    collection: "Users"
});
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=userSchema.js.map