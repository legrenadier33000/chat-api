const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')
const User = require("../../models/user")

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

const addMember = async (req, res, next) => {
    console.log(req.params)
    const valid = ajv.validate(schema, req.params)
    
    if(!valid) { 
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }
    
    const group = await Group.findById(req.params.groupId).exec()
    const user = await User.findById(req.params.userId).lean()

    if(!group) { 
        next(ResourceNotFound.factory('Group not found'))
    }

    if(!user) { 
        next(ResourceNotFound.factory('User not found'))
    }
    
    group.members.push(user._id)
    await group.save()

    res.send("Member added")
}

module.exports = addMember