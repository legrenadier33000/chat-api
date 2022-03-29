const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')
const mongoose = require("mongoose")

const schema = {
    type: "object",
    properties: {
      id: {type: "string", maxLength: 24}
    },
    required: ["id"],
    additionalProperties: false
}

const readGroupMessages = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.params)
        const userId = res.locals.user._id

        if(!valid) { throw new Error("Invalid request") }

        const group = await Group.findById(req.params.id)

        if(!group) { throw new Error("Group not found")}
        
        console.log(group.members[0])

        const unreadMessages = group.messages.filter((message) => {
            return !(userId in message.read_by)
        })

        res.send(JSON.stringify(unreadMessages))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = readGroupMessages