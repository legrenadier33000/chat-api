const { Group, GroupMessage } = require('../../models/group')
const Ajv = require("ajv")
const ResourceNotFound = require('../../middlewares/errors/ResourceNotFound')
const ajv = new Ajv()

const schema = {
    type: "object",
    properties: {
      content: {type: "string", maxLength: 1000}
    },
    required: ["content"],
    additionalProperties: false
}

const sendMessage = async (req, res, next) => {
    const valid = ajv.validate(schema, req.body)
    
    if(!valid) { 
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const userId = res.locals.user._id
    const group = await Group.findById(req.params?.id)

    if(!group) { 
        next(ResourceNotFound.factory('Group not found'))
    }

    const message = new GroupMessage({
        from: userId,
        content: req.body.content
    })

    group.messages.push(message)

    await group.save()

    res.send("Message sent")
}

module.exports = sendMessage