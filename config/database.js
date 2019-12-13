const mongoose = require("mongoose")
const mongodb = 'mongodb://localhost/QtechDB'

mongoose.connect(mongodb, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;