const mongoose = require("mongoose")

const groupMessageSchema = new mongoose.Schema({
    from: mongoose.ObjectId,
    content: String,
    read_by: { type: [mongoose.ObjectId], default: [] },
    created_at: { type: Date, default: Date.now() }
})

const groupSchema = new mongoose.Schema({
    name: String,
    administrators: [mongoose.ObjectId],
    members: [mongoose.ObjectId],
    messages: [groupMessageSchema],
    created_at: { type: Date, default: Date.now()}
})

const GroupMessage = new mongoose.model('GroupMessage', groupMessageSchema)
const Group = new mongoose.model('Group', groupSchema)

module.exports = { Group, GroupMessage }