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
require('dotenv').config({ path: '../.env' });
const mongoose_1 = __importDefault(require("mongoose"));
const Book = require('../db/models/booksSchema');
module.exports = {
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, authorID, description, coverImage, tag } = req.body;
        console.log("getting here");
        console.log(req.body);
        const book = new Book({
            _id: new mongoose_1.default.Types.ObjectId(),
            title: title,
            authorID: authorID,
            description: description,
            coverImage: coverImage,
            tags: tag,
            isPublished: false,
        });
        let savedBook = yield book.save();
        if (savedBook) {
            res.status(201).send(savedBook);
            return;
        }
        res.status(400).send('unable to save book');
    }),
    getBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        console.log(id);
        let foundBook = yield Book.findOne({ _id: id })
            .then((book) => {
            if (book) {
                console.log('here 1');
                return book;
            }
            else {
                console.log('here 2');
                return null;
            }
        })
            .catch((err) => {
            return err;
        });
        console.log(foundBook);
        if (foundBook) {
            res.status(200).send(foundBook);
            return;
        }
        else {
            res.status(400).send('Unable to find Book!');
        }
    }),
    getChapterCount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
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
            res.json(foundBook.chapters.length);
        }
        else {
            res.sendStatus(400);
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let deleteBook = yield Book.deleteOne({ _id: id }).then((book) => {
            if (book) {
                res.sendStatus(200);
                return;
            }
            else {
                res.status(400).send('Unable to find Book!');
            }
        });
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, authorID, description, coverImage, tag } = req.body;
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
            let bookToUpdate = {
                title: foundBook.title,
                authorID: foundBook.authorID,
                coverImage: foundBook.coverImage,
                description: foundBook.description,
                tags: foundBook.tags,
            };
            const updatedBook = yield Book.updateOne({ _id: id }, {
                title: title || bookToUpdate.title,
                authorID: authorID || bookToUpdate.authorID,
                description: description || bookToUpdate.description,
                coverImage: coverImage || bookToUpdate.coverImage,
                tags: tag || bookToUpdate.tags,
                isPublished: false,
            });
            if (updatedBook) {
                res.sendStatus(200);
            }
            else {
                res.status(400).send('Book not updated');
            }
        }
    }),
    getAllBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let getBooks = yield Book.find();
        if (getBooks) {
            res.status(201).send(getBooks);
            return;
        }
        res.status(400).send('unable to get books');
    }),
    getBooksByAuthorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id: authorId } = req.params;
        let getBooks = yield Book.find({ authorID: authorId });
        if (getBooks.length > 0) {
            return res.status(200).send(getBooks);
        }
        return res.status(404).send('No books found.');
    }),
};
//# sourceMappingURL=bookCtrl.js.map