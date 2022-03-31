const bcrypt = require("bcrypt")
const Ajv = require("ajv")
const ajv = new Ajv()
const User = require('../../models/user')

const schema = {
    type: "object",
    properties: {
      email: {type: "string", maxLength: 255},
      password: {type: "string", maxLength: 60}
    },
    required: ["email", "password"],
    additionalProperties: false
}

const register = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.body)

        if(!valid) {
            throw new Error("Invalid request")
        }

        const existingEmail = await User.findOne({ email: req.body.email }).exec()

        if(existingEmail) {
            throw new Error("Email address already in use")
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
    
        const registeredUser = new User(req.body)
        await registeredUser.save()
    
        res.send(JSON.stringify(registeredUser))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = register