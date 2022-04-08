const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')
const User = require("../../models/user")

const InvalidRequestSchema = require("../../middlewares/errors/InvalidRequestSchema")
const ResourceNotFound = require("../../middlewares/errors/ResourceNotFound")

const schema = {
    type: "object",
    properties: {
      groupId: {type: "string", minLength: 24, maxLength: 24},
      userId: {type: "string", minLength: 24, maxLength: 24},
    },
    required: ["groupId", "userId"],
    additionalProperties: true
}

const removeMember = async (req, res, next) => {
    const valid = ajv.validate(schema, req.params)
    
    if(!valid) { 
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const group = await Group.findById(req.params.groupId)
    const user = await User.findById(req.params.userId)

    if(!group) { 
        next(ResourceNotFound.factory('Group not found'))    
    }

    if(!user) { 
        next(ResourceNotFound.factory('User not found'))
    }

    group.members.pull(req.params.userId)

    await group.save()

    res.send("Member removed")
}

module.exports = removeMember