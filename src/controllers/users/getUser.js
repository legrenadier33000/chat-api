const Ajv = require("ajv")
const ajv = new Ajv()
const User = require('../../models/user')

const InvalidRequestSchema = require('../../utils/errors/InvalidRequestSchema')
const ResourceNotFound = require('../../utils/errors/ResourceNotFound')

const schema = {
    type: "object",
    properties: {
      id: {type: "string", minLength: 24, maxLength: 24},
    },
    required: ["id"],
    additionalProperties: true
}

const getUser = async (req, res, next) => {
    const valid = ajv.validate(schema, req.params)

    if(!valid) { 
        return next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const user = await User.findById(req.params.id).lean()

    if(!user) {
        return next(ResourceNotFound.factory('User not found'))
    }

    res.json(user)
}

module.exports = getUser