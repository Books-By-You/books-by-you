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
const bcrypt = require('bcryptjs');
const User = require('../db/models/userSchema');
module.exports = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //console.log(req.body)
        const { username, password, firstName, lastName, email, profileImage } = req.body;
        let canRegister = yield User.findOne({ $or: [{ email: email }, { username: username }] })
            .then(user => {
            if (!user) {
                return true;
            }
            return false;
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
        });
        if (!canRegister) {
            return res.status(400).json({ message: 'Email or username is already in use' });
        }
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({
            _id: new mongoose_1.default.Types.ObjectId(),
            username: username,
            passwordHash: hash,
            firstName: firstName,
            lastName: lastName,
            email: email,
            profileImage: profileImage
        });
        let sentUser = yield user.save();
        console.log(sentUser);
        // console.log(typeof(sentUser))
        if (sentUser) {
            let newUser = {
                _id: sentUser._id,
                username: sentUser.username,
                firstName: sentUser.firstName,
                lastName: sentUser.lastName,
                email: sentUser.email,
                profileImage: sentUser.profileImage
            };
            // sentUser.passwordHash = null
            req.session.user = Object.assign({}, newUser);
            //console.log(req.session.user)
            res.status(201).send(newUser);
            return;
        }
        res.status(400).send('unable to save user');
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    })
};
//# sourceMappingURL=authCtrl.js.map