const User3 = require('../db/models/userSchema')

module.exports = {
  getUser: async (req, res) => {
    const { id } = req.params

    await User3.findOne({_id: id})
      .then(user => {
        if(user) {
          let foundUser = {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImage: user.profileImage,
            books: user.books,
            authors: user.authors,
            isAuthor: user.isAuthor,
            patreonLink: user.patreonLink
          }

          res.status(200).send(foundUser)
          return
        }else{
          res.sendStatus(400)
        }
      })
      .catch(error => {
        console.log(error)
        res.sendStatus(400)
      })
  }
}