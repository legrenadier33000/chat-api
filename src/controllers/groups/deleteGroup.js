const Ajv = require("ajv")
const InsuficientCredentials = require("../../middlewares/errors/InsuficientCredentials")
const InvalidRequestSchema = require("../../middlewares/errors/InvalidRequestSchema")
const ResourceNotDeleted = require("../../middlewares/errors/ResourceNotDeleted")
const ResourceNotFound = require("../../middlewares/errors/ResourceNotFound")
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

const postGroup = async (req, res, next) => {
    const valid = ajv.validate(schema, req.params)
    const userId = res.locals.user._id

    if(!valid) {
        next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const group = await Group.findOne({ _id: req.params.id })

    if(!group) { 
        next(ResourceNotFound.factory('Group not found'))
    }
    
    let isAdministrator = false

    for(admin of group.administrators) {
        admin.toString() === userId ? isAdministrator = true : isAdministrator = false
    }

    if(!isAdministrator) {
        next(InsuficientCredentials.factory())
    }

    const count = await Group.deleteOne({ _id: req.params.id })

    if(count.deletedCount !== 1) {
        next(ResourceNotDeleted.factory("Group could not be deleted"))
    }

    res.send("Group deleted")
}

module.exports = postGroup