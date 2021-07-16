"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "../.env" });
const User2 = require("../db/models/userSchema");
module.exports = {
    addToBookshelf: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { userId } = req.body;
        let foundUser = yield User2.findOne({ _id: userId })
            .then((user) => {
            if (user) {
                return user;
            }
            else {
                return null;
            }
        })
            .catch((err) => {
            console.log(err);
            return null;
        });
        if (foundUser) {
            foundUser.books.push(id);
            let userUpdated = yield foundUser.save();
            if (userUpdated) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        }
        else {
            res.sendStatus(400);
        }
    }),
    getBookshelf: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let foundUser = yield User2.findOne({ _id: id })
            .then((user) => {
            if (user) {
                return user;
            }
            else {
                return null;
            }
        })
            .catch((err) => {
            console.log(err);
            return null;
        });
        if (foundUser) {
            res.status(200).send(foundUser.books);
        }
        else {
            res.sendStatus(400);
        }
    }),
    removeFromBookshelf: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { userID } = req.body;
        let foundUser = yield User2.findOne({ _id: userID })
            .then((user) => {
            if (user) {
                return user;
            }
            else {
                return null;
            }
        })
            .catch((err) => {
            console.log(err);
            return null;
        });
        if (foundUser) {
            let foundIndex = -1;
            for (let i = 0; i < foundUser.books.length; i++) {
                if (foundUser.books[i].toString() === id) {
                    foundIndex = i;
                }
            }
            if (foundIndex >= 0) {
                foundUser.books.splice(foundIndex, 1);
                let userUpdated = yield foundUser.save();
                if (userUpdated) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(400);
                }
            }
            else {
                res.sendStatus(400);
            }
        }
        else {
            res.sendStatus(400);
        }
    }),
};
//# sourceMappingURL=bookshelfCtrl.js.map