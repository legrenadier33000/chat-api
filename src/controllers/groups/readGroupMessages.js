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

        // Fetch all unread messages
        const unreadMessages = group.messages.filter((message) => {
            for(read_by of message.read_by)
                if(JSON.stringify(userId) === JSON.stringify(read_by))
                    return false
            return true
        })

        // Mark all messages as "read"
        for(message of unreadMessages) {
            message.read_by.push(userId)
        }

        await group.save()

        res.send(JSON.stringify(unreadMessages))
    } catch (e) {
        console.log(e)
        res.status(500).send(e.message)
    }
}

module.exports = readGroupMessages