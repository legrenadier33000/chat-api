const mongoose = require("mongoose")

const privateMessageSchema = new mongoose.Schema({
    from: String,
    content: String,
    read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now() }
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    inbox: [privateMessageSchema],
    created_at: { type: Date, default: Date.now() }
})

const User = new mongoose.model('User', userSchema)

module.exports = User