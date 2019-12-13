var mongoose = require("mongoose")

const Schema = mongoose.Schema

var attendanceSchema = new Schema({
    loginID: String,
    logDate: String,
    signInTime: String,
    signOutTime: String,
    attendanceStatus: String,
    reasonForLeave: String
})

module.exports = mongoose.model('attendance', attendanceSchema)