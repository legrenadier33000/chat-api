const mongoose = require("mongoose")

const mongoConnect = async () => {
    const mongoConnectionString = process.env.MONGO_STRING || "mongodb://localhost:27017/chat-api"
    await mongoose.connect(mongoConnectionString);
    console.log('Connected to MongoDB')
}

module.exports = mongoConnect