'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
require('dotenv').config({ path: '../.env' });
const { SERVER_PORT } = process.env;
const app = express_1.default();
app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));
//Auth Endpoints - maybe temporary pending passport w/Oauth implementation
// app.post('/api/auth/register', authCtrl.register);
// app.post('/api/auth/login', authCtrl.login);
// app.delete('/api/auth/logout', authCtrl.logout)
// app.post('/api/auth/delete', authCtrl.delete)
//Book Endpoints
//# sourceMappingURL=index.js.map
