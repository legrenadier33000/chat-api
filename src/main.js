const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

const router = require("./router/router")
const port = process.env.APP_PORT || 80

main().catch(e => console.error(e));

async function main() {
    const mongoConnectionString = process.env.MONGO_STRING || "mongodb://localhost:27017/chat-api"
    await mongoose.connect(mongoConnectionString);
    console.log('Connected to MongoDB')
}

app.disable('x-powered-by')
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`Listening on ${port}`))