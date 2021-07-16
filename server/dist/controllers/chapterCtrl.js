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
    updateChapter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { content, number, title, chapter_id } = req.body;
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
            let chapterIndex = foundBook.chapters.findIndex((chapter) => {
                console.log(chapter._id);
                console.log(chapter_id);
                return chapter._id == chapter_id;
            });
            console.log(chapterIndex);
            let chapterToUpdate = {
                _id: foundBook.chapters[chapterIndex]._id,
                title: title || foundBook.chapters[chapterIndex].title,
                number: number || foundBook.chapters[chapterIndex].number,
                content: content || foundBook.chapters[chapterIndex].content
            };
            foundBook.chapters.splice(chapterIndex, 1, chapterToUpdate);
            console.log(foundBook.chapters);
            const updatedChapter = yield Book.updateOne({ _id: id }, {
                title: foundBook.title,
                authorID: foundBook.authorID,
                description: foundBook.description,
                coverImage: foundBook.CoverImage,
                tags: foundBook.tags,
                chapters: foundBook.chapters,
                isPublished: false,
            });
            if (updatedChapter) {
                res.sendStatus(200);
            }
            else {
                res.status(400).send("Chapter not updated");
            }
        }
    })
};
//# sourceMappingURL=chapterCtrl.js.map