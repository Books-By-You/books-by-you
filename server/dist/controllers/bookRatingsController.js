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
const BookRatings = require('../db/models/bookRatingsSchema');
module.exports = {
    getRatings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let bookRatings = yield BookRatings.findOne({ _id: id }).then(res => {
            console.log(res);
        });
    }),
    addBookRating: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const {} = req.body;
    })
};
//# sourceMappingURL=bookRatingsController.js.map