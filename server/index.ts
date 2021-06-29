import express from 'express';
require('dotenv').config({ path: '../.env' });

const { SERVER_PORT } = process.env;

const app = express();
const mongoController = require('./db/mongoController');

app.listen(SERVER_PORT, async () => {
  console.log(`Server running on ${SERVER_PORT}`);
  let dbs = await mongoController.getUser('alex');
  console.log(dbs);
});
