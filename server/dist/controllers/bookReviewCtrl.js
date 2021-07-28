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
const BookReview = require("../db/models/bookReviewSchema");
const mongoose_1 = __importDefault(require("mongoose"));
module.exports = {
    getBookReviews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const bookReviews = yield BookReview.find({ bookID: id }).exec();
        if (bookReviews.length > 0) {
            res.status(200).send(bookReviews);
            return;
        }
        else {
            return res.status(200).send([]);
        }
        res.status(400).send("Unable to find reviews for this book.");
    }),
    getBookReviewsForUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const bookReviews = yield BookReview.find({ userID: id }).exec();
        console.log(bookReviews);
        if (bookReviews.length > 0) {
            res.status(200).send(bookReviews);
            return;
        }
        else {
            return res.status(200).send([]);
        }
        res.status(400).send("Unable to find reviews for this user.");
    }),
    addBookReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userID, review, bookID } = req.body;
        const newBookReview = new BookReview({
            _id: new mongoose_1.default.Types.ObjectId(),
            bookID: bookID,
            content: review,
            userID: userID,
            date: new Date(),
        });
        let savedReview = yield newBookReview.save();
        if (savedReview) {
            res.status(201).send(savedReview);
            return;
        }
        res.status(400).send("unable to save review");
    }),
    updateBookReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { review } = req.body;
        let foundReview = yield BookReview.findOne({ _id: id })
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
        if (foundReview) {
            const updatedReview = yield BookReview.updateOne({ _id: id }, {
                content: review,
            });
            if (updatedReview) {
                res.sendStatus(200);
            }
            else {
                res.status(400).send("Book review not updated");
            }
        }
        else {
            res.status(400).send("Book review not updated");
        }
    }),
    deleteBookReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let deleteBookReview = yield BookReview.deleteOne({ _id: id }).then((bookRev) => {
            if (bookRev) {
                res.sendStatus(200);
                return;
            }
            else {
                res.status(400).send("Unable to find book review!");
            }
        });
    }),
};
//# sourceMappingURL=bookReviewCtrl.js.map