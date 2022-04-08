const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')
const Ajv = require("ajv")
const ajv = new Ajv()

const InvalidCredentials = require('../../middlewares/errors/InvalidCredentials')

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

const login = async (req, res, next) => {
    const valid = ajv.validate(schema, req.body)

    if(!valid) {
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const user = await User.findOne({ email: req.body.email }).lean()

    if(!user) {
        next(InvalidCredentials.factory())
    }

    const hashValidation = await bcrypt.compare(req.body.password, user.password)

    if(!hashValidation) {
        next(InvalidCredentials.factory())
    }

    const token = jwt.sign(user, APP_SECRET_KEY, { expiresIn: '1h' })

    res.send({jwt: token})
}

module.exports = login