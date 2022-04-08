const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')

const InsuficientCredentials = require("../../utils/errors/InsuficientCredentials")
const InvalidRequestSchema = require("../../utils/errors/InvalidRequestSchema")
const ResourceNotDeleted = require("../../utils/errors/ResourceNotDeleted")
const ResourceNotFound = require("../../utils/errors/ResourceNotFound")

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
        return next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const group = await Group.findOne({ _id: req.params.id })

    if(!group) { 
        return next(ResourceNotFound.factory('Group not found'))
    }
    
    let isAdministrator = false

    for(admin of group.administrators) {
        admin.toString() === userId ? isAdministrator = true : isAdministrator = false
    }

    if(!isAdministrator) {
        return next(InsuficientCredentials.factory())
    }

    const count = await Group.deleteOne({ _id: req.params.id })

    if(count.deletedCount !== 1) {
        return next(ResourceNotDeleted.factory("Group could not be deleted"))
    }

    res.send("Group deleted")
}

module.exports = postGroup