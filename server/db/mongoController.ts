import { MongoClient } from 'mongodb'
require('dotenv').config({path: '../.env'})

const user = process.env.MONGO_USER;
const userPassword = process.env.MONGO_PASSWORD;
const cluster = "books-by-you.stwxg";

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = MongoClient(url)

module.exports = {
  getAllDatabases: async () => {
    try {
      await client.connect()
      const dblist = await client.db().admin().listDatabases()
      let databases = []
      dblist.databases.forEach(db => {
        databases.push(db.name)
      })
      return databases
    } finally {
      client.close()
    }
  },
  getUser: async (username) => {
    try {
      await client.connect()
      const result = await client.db('Books-By-You').collection('Users').findOne({username: username})
      return result
    } catch(error) {
      console.log(error)
    } finally {
      client.close()
    }
  },
  getAllUsers: async () => {
    try {
      await client.connect()
      const cursor = client.db('Books-By-You').collection('Users').find()
      const results = await cursor.toArray()
      return results
    } catch(error) {
      console.log(error)
    } finally {
      client.close()
    }
  },
  createUser: async (newUser) => {
    try {
      await client.connect()
      const result = await client.db('Books-By-You').collection('Users').insertOne(newUser)
      return result
    } catch(error) {
      console.log(error)
    } finally {
      client.close()
    }
  }
}