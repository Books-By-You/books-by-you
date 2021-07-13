import mongoose from 'mongoose'

const BookRatings = require('../db/models/bookRatingsSchema')

module.exports = {
  getRatings: async (req, res) => {
    const { id } = req.params

    let bookRatings = await BookRatings.findOne({ _id: id}).then(res =>{
      console.log(res)

    })
    
  },
  addBookRating: async (req, res) => {
    const {} = req.body
  }

}