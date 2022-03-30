const Ajv = require("ajv")
const ajv = new Ajv()
const User = require('../../models/user')

const schema = {
    type: "object",
    properties: {
      id: {type: "string", minLength: 24, maxLength: 24},
    },
    required: ["id"],
    additionalProperties: true
}

const getUser = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.params)

        if(!valid) { throw new Error("Invalid request") }

        const user = await User.findById(req.params.id).lean()

        if(!user) { throw new Error("User not found") }

        res.send(JSON.stringify(user))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = getUser