const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    pseudo: String
})

const User = new mongoose.Model('User', userSchema)

module.exports = User