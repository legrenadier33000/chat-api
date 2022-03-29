const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')

const schema = {
    type: "object",
    properties: {
      id: {type: "string", minLength: 24, maxLength: 24}
    },
    required: ["id"],
    additionalProperties: false
}

const postGroup = async (req, res) => {
    try {
        const valid = ajv.validate(schema, req.params)
        const userId = res.locals.user._id

        if(!valid) {
            throw new Error("Invalid request")
        }

        const group = await Group.findOne({ _id: req.params.id })

        if(!group) { 
            throw new Error("Group not found")
        }
        
        let isAdministrator = false

        for(admin of group.administrators) {
            admin.toString() === userId ? isAdministrator = true : isAdministrator = false
        }

        if(!isAdministrator) {
            throw new Error("You must be an administrator of this group to delete it")
        }

        const count = await Group.deleteOne({ _id: req.params.id })

        if(count.deletedCount !== 1) {
            throw new Error("Group could not be deleted, please retry later")
        }
    
        res.send("Group deleted")
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = postGroup