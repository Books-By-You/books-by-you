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
const mongodb_1 = require("mongodb");
require('dotenv').config({ path: '../.env' });
const user = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;
const cluster = "books-by-you.stwxg";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(url);
module.exports = {
    getAllDatabases: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.connect();
            const dblist = yield client.db().admin().listDatabases();
            let databases = [];
            dblist.databases.forEach(db => {
                databases.push(db.name);
            });
            return databases;
        }
        finally {
            client.close();
        }
    }),
    getUser: (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.db('Books-By-You').collection('Users').findOne({ username: username });
            return result;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client.close();
        }
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.connect();
            const cursor = client.db('Books-By-You').collection('Users').find();
            const results = yield cursor.toArray();
            return results;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client.close();
        }
    }),
    createUser: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.db('Books-By-You').collection('Users').insertOne(newUser);
            return result;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            client.close();
        }
    })
};
//# sourceMappingURL=mongoController.js.map