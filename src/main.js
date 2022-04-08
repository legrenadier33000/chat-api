const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const app = express()
const router = require("./router/router")
const port = process.env.APP_PORT || 80

const mongoConnect = require("./utils/db/mongoConnection")
mongoConnect().catch(e => console.error(e))

app.disable('x-powered-by')
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`Listening on ${port}`))