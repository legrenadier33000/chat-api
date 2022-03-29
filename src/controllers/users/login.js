const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const Ajv = require("ajv")
const ajv = new Ajv()

const APP_SECRET_KEY = process.env.APP_SECRET_KEY

const schema = {
    type: "object",
    properties: {
      email: {type: "string", maxLength: 255},
      password: {type: "string", maxLength: 60}
    },
    required: ["email", "password"],
    additionalProperties: false
}

const login = async (req, res) => {
    try {

        const valid = ajv.validate(schema, req.body)

        if(!valid) {
            throw new Error("Invalid request")
        }

        const user = await User.findOne({ email: req.body.email }).lean()

        if(!user) {
            throw new Error("Invalid credentials")
        }

        const hashValidation = await bcrypt.compare(req.body.password, user.password)

        if(!hashValidation) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(user, APP_SECRET_KEY, { expiresIn: '1h' })

        res.send({jwt: token})

    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

module.exports = login