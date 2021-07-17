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
const Book = require('../db/models/booksSchema');
module.exports = {
    getBookRatings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id: bookId } = req.params;
        const bookRatings = yield Book.findOne({ _id: bookId })
            .then((response) => {
            return response.ratings;
        })
            .catch((error) => {
            console.log(error);
            return res.sendStatus(404);
        });
        if (bookRatings.length === 0) {
            return res.status(400).send('No rating found');
        }
        const ratingsTotal = bookRatings.reduce((total, bookRating) => {
            return total + bookRating.rating;
        }, 0);
        const averageRating = ratingsTotal / bookRatings.length;
        return res.status(200).send({ rating: averageRating });
    }),
    addBookRating: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { id: bookId } = req.params;
        const { userId, rating } = req.body;
        const foundBook = yield Book.findOne({ _id: bookId })
            .then((response) => {
            return response;
        })
            .catch((error) => {
            console.log(error);
            return res.sendStatus(404);
        });
        const userReview = foundBook.ratings.filter((book) => {
            return book.userId === userId;
        });
        if ((_a = userReview[0]) === null || _a === void 0 ? void 0 : _a.rating) {
            return res.status(409).send('Rating already exists');
        }
        foundBook.ratings.push({
            userId,
            rating,
        });
        yield foundBook
            .save()
            .then((savedDoc) => {
            if (savedDoc === foundBook) {
                return res
                    .status(200)
                    .send(`Rating of ${rating} for ${foundBook.title} has been added.`);
            }
        })
            .catch((error) => {
            console.log(error);
            return res.status(400).send('Failed to complete changes.');
        });
    }),
    updateBookRating: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Need to store individual user rating in order to update rating
    }),
    deleteBookRating: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Need to store individual user rating in order to delete rating
    }),
};
//# sourceMappingURL=bookRatingsController.js.map