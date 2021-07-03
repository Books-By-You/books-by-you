require('dotenv').config({path: '../.env'})
import mongoose from 'mongoose'
const bcrypt = require('bcryptjs')
const User = require('../db/models/userSchema')

module.exports = {
  register: async (req, res) => {
    const { username, password, firstName, lastName, email, profileImage } = req.body

    let canRegister = await User.findOne({$or: [{ email: email}, {username: username}] })
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
     
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      passwordHash: hash,
      firstName: firstName,
      lastName: lastName,
      email: email,
      profileImage: profileImage
    })

    let sentUser = await user.save()

    if(sentUser){  
      let newUser = {
        _id: sentUser._id,
        username: sentUser.username,
        firstName: sentUser.firstName,
        lastName: sentUser.lastName,
        email: sentUser.email,
        profileImage: sentUser.profileImage,
        books: sentUser.books,
        authors: sentUser.authors,
        isAuthor: sentUser.isAuthor,
        patreonLink: sentUser.patreonLink
      }

      req.session.user = {...newUser} 
      res.status(201).send(newUser)
      return
    }
    
    res.status(400).send('unable to save user')
  },
  login: async (req, res) => {

  }
}