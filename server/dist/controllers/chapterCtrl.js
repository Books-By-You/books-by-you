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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "../.env" });
const mongoose_1 = __importDefault(require("mongoose"));
const Book = require("../db/models/booksSchema");
module.exports = {
    addChapter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { content, number, title, id } = req.body;
        const chapter = {
            _id: new mongoose_1.default.Types.ObjectId(),
            title: title,
            content: content,
            number: number,
        };
        // let savedChapter = await chapter.save();
        console.log("Hitting add chapter");
        let foundBook = yield Book.findOne({ _id: id })
            .then((book) => {
            if (book) {
                return book;
            }
            else {
                return null;
            }
        })
            .catch((err) => {
            console.log(err);
            return null;
        });
        if (foundBook) {
            foundBook.chapters.push(chapter);
            let addedChapter = yield Book.updateOne({
                _id: id
            }, {
                title: foundBook.title,
                authorID: foundBook.authorID,
                description: foundBook.description,
                coverImage: foundBook.coverImage,
                isPublished: false,
                chapters: foundBook.chapters,
            });
            res.sendStatus(200);
            console.log(addedChapter);
            return;
        }
        else {
            res.status(400).send("Unable to add Chapter");
        }
    }),
};
//# sourceMappingURL=chapterCtrl.js.map