const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')

const schema = {
    type: "object",
    properties: {
      name: {type: "string", maxLength: 255}
    },
    required: ["name"],
    additionalProperties: false
}

const createGroup = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.body)
        const userId = res.locals.user._id

        if(!valid) {
            throw new Error("Invalid request")
        }

        const newGroup = new Group({ name: req.body.name })
        newGroup.administrators.push(userId)
        newGroup.members.push(userId)

        await newGroup.save()
    
        res.send(JSON.stringify(newGroup))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = createGroup