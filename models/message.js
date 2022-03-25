const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    from: String,
    to: String, // Either GROUP_ID or USER_ID
    content: String,
    created_at: { type: Date, default: Date.now() }
})

const Message = new mongoose.Model('Message', messageSchema)

module.exports = Message