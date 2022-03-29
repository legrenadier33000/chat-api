const { Group, GroupMessage } = require('../../models/group')
const Ajv = require("ajv")
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
      content: {type: "string", maxLength: 1000}
    },
    required: ["content"],
    additionalProperties: false
}

const sendMessage = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.body)
        
        if(!valid) { throw new Error("Invalid request") }

        const userId = res.locals.user._id
        const group = await Group.findById(req.params?.id)

        if(!group) { throw new Error("Group not found") }

        const message = new GroupMessage({
            from: userId,
            content: req.body.content
        })

        group.messages.push(message)

        await group.save()

        res.send("Message sent")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = sendMessage