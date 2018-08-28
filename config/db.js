const mongoose = require('mongoose')
const keys = require('./keys')

//Map global promises
mongoose.Promise = global.Promise

//Mongoose Connect
mongoose.connect(`mongodb://${keys.username}:${keys.password}@ds137102.mlab.com:37102/pusherpoll`)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err) )
