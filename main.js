const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

const router = require("./router/router")
const port = process.env.APP_PORT || 80


main().catch(err => console.log(err));

async function main() {
    const mongoConnectionString = process.env.MONGO_STRING
    await mongoose.connect('mongodb://localhost:27017/test');
}

app.use(express.json())
app.use(router);

app.listen(port, () => console.log(`Listening on ${port}`))