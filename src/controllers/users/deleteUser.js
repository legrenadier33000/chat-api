const bcrypt = require("bcrypt")
const Ajv = require("ajv")
const ajv = new Ajv()
const User = require('../../models/user')

const InvalidRequestSchema = require('../../utils/errors/InvalidRequestSchema')
const ResourceNotFound = require('../../utils/errors/ResourceNotFound')
const ResourceNotDeleted = require("../../utils/errors/ResourceNotDeleted")

const schema = {
    type: "object",
    properties: {
      id: {type: "string", minLength: 24, maxLength: 24},
    },
    required: ["id"],
    additionalProperties: true
}

const deleteUser = async (req, res, next) => {
    const valid = ajv.validate(schema, req.params)

    if(!valid) {
        return next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const user = await User.findOne({ _id: req.params.id })

    if(!user) { 
        return next(ResourceNotFound.factory('User not found'))
    }

    const count = await User.deleteOne({ _id: req.params.id }).exec()

    if(count.deletedCount !== 1) {
        return next(ResourceNotDeleted.factory('User could not be deleted'))
    }

    res.send("User deleted")
}

module.exports = deleteUser