"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config({ path: '../.env' });
const { SERVER_PORT } = process.env;
const app = express_1.default();
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
//# sourceMappingURL=index.js.map