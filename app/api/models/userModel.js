var mongoose = require("mongoose")

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    userName: String,
    loginID: String,
    password: String,
    userType: String
})

module.exports = mongoose.model('User', UserSchema)