import mongoose from 'mongoose'

const Book = require('../db/models/booksSchema')

module.exports = {
  getBookRatings: async (req, res) => {
    const { id } = req.params
    console.log('hit getBookRatings')

    
    let bookRatings = await Book.findOne({ _id: id}).then(res =>{
      console.log(`res: ${res}`)
      
    })

    if(bookRatings){
      console.log(bookRatings)
      
    }
    
    
  },
  addBookRating: async (req, res) => {
    const {} = req.body
  }

}