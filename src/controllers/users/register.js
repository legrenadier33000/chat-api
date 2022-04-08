const bcrypt = require("bcrypt")
const Ajv = require("ajv")
const ajv = new Ajv()
const User = require('../../models/user')

const InvalidRequestSchema = require('../../middlewares/errors/InvalidRequestSchema')
const EmailAlreadyInUse = require('../../middlewares/errors/EmailAlreadyInUse')

const schema = {
    type: "object",
    properties: {
      email: {type: "string", maxLength: 255},
      password: {type: "string", maxLength: 60}
    },
    required: ["email", "password"],
    additionalProperties: false
}

const register = async (req, res, next) => {
    const valid = ajv.validate(schema, req.body)

    if(!valid) {
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const existingEmail = await User.findOne({ email: req.body.email }).exec()

    if(existingEmail) {
        next(EmailAlreadyInUse.factory())
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    const registeredUser = new User(req.body)
    await registeredUser.save()

    res.send(JSON.stringify(registeredUser))
}

module.exports = register