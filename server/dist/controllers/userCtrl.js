var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const bcrypt = require('bcryptjs');
const User3 = require('../db/models/userSchema');
module.exports = {
    getUser: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield User3.findOne({ _id: id })
            .then((user) => {
            if (user) {
                let foundUser = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profileImage: user.profileImage,
                    books: user.books,
                    authors: user.authors,
                    isAuthor: user.isAuthor,
                    patreonLink: user.patreonLink,
                };
                res.status(200).send(foundUser);
                return;
            }
            else {
                res.sendStatus(400);
            }
        })
            .catch((error) => {
            console.log(error);
            res.sendStatus(400);
        });
    }),
    updateUser: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = req.params;
        const { username, password, profileImage } = req.body;
        const foundUser = yield User3.findById(userId)
            .then((user) => {
            return user;
        })
            .catch((err) => {
            return res.status(404).send('User not found');
        });
        if (foundUser === null) {
            return res.sendStatus(404);
        }
        if (password) {
            const salt = bcrypt.genSaltSync(5);
            const hash = bcrypt.hashSync(password, salt);
            foundUser.profileImage = profileImage || foundUser.profileImage;
            foundUser.username = username || foundUser.username;
            foundUser.passwordHash = hash;
            yield foundUser
                .save()
                .then((savedDoc) => {
                if (savedDoc === foundUser) {
                    return res.status(200).send(foundUser);
                }
            })
                .catch((error) => {
                return res.status(400).send('Failed to complete changes.');
            });
        }
        foundUser.profileImage = profileImage || foundUser.profileImage;
        foundUser.username = username || foundUser.username;
        yield foundUser
            .save()
            .then((savedDoc) => {
            if (savedDoc === foundUser) {
                return res.status(200).send(foundUser);
            }
        })
            .catch((error) => {
            return res.status(400).send('Failed to complete changes.');
        });
    }),
};
//# sourceMappingURL=userCtrl.js.map