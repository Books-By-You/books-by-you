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
        const { id } = req.params;
        const bookRatings = yield Book.findOne({ _id: id })
            .then((response) => {
            const { ratingCount, ratingAggregate } = response;
            const average = ratingAggregate / ratingCount;
            return average;
        })
            .catch((error) => {
            console.log(error);
            return res.sendStatus(404);
        });
        if (bookRatings) {
            return res.status(200).send({ rating: bookRatings });
        }
        return res.status(400).send('No rating found');
    }),
    addBookRating: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { rating } = req.body;
        const foundBook = yield Book.findOne({ _id: id })
            .then((response) => {
            return response;
        })
            .catch((error) => {
            console.log(error);
            return res.sendStatus(404);
        });
        if (!foundBook) {
            return res.sendStatus(404);
        }
        if (foundBook.ratingCount || foundBook.ratingAggregate) {
            return res.status(400).send('Rating already exists');
        }
        foundBook.ratingCount = 1;
        foundBook.ratingAggregate = rating;
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
};
//# sourceMappingURL=bookRatingsController.js.map