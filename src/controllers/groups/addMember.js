const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')
const User = require("../../models/user")

const schema = {
    type: "object",
    properties: {
      groupId: {type: "string", minLength: 24, maxLength: 24},
      userId: {type: "string", minLength: 24, maxLength: 24},
    },
    required: ["groupId", "userId"],
    additionalProperties: true
}

const addMember = async (req, res) => {
    try {
        console.log(req.params)
        const valid = ajv.validate(schema, req.params)
        
        if(!valid) { throw new Error("Invalid request") }
        
        const group = await Group.findById(req.params.groupId).exec()
        const user = await User.findById(req.params.userId).lean()

        if(!group) { throw new Error("Group not found") }

        if(!user) { throw new Error("User not found") }
        
        group.members.push(user._id)
        await group.save()

        res.send("Member added")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = addMember