require('dotenv').config()
const express = require('express')
const app = express()
const userController = require('./controllers/user.controller')
const movieController = require('./controllers/movie.controller')
const cors = require('cors')

// ! connecting to the DB
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/moviedb");
const db = mongoose.connection

db.once("open", () => {
  console.log("connected to the DB")
})

app.use(express.json())
app.unsubscribe(express.urlencoded())
app.use(cors())

app.use('/user', userController)
app.use('/movie', movieController)

app.listen(process.env.PORT, () => {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});
