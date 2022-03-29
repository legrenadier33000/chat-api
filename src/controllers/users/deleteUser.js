const bcrypt = require("bcrypt")
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

const deleteUser = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.params)

        if(!valid) {
            throw new Error("Invalid request")
        }

        const user = await User.findOne({ _id: req.params.id })

        if(!user) { 
            throw new Error("User not found")
        }

        const count = await User.deleteOne({ _id: req.params.id }).exec()

        if(count.deletedCount !== 1) {
            throw new Error("User could not be deleted")
        }
    
        res.send("User deleted")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = deleteUser