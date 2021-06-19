import express from 'express'
require('dotenv').config({path: '../.env'})

const {SERVER_PORT} = process.env

const app = express()

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))