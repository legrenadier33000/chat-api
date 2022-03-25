const mongoose = require("mongoose")

const groupSchema = new mongoose.Schema({
    name: String,
    members: [String] // Using MongoDB OID
})

const Group = new mongoose.Model('Group', groupSchema)

module.exports = Group