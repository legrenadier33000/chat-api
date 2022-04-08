const Ajv = require("ajv")
const ajv = new Ajv()
const { Group } = require('../../models/group')

const InvalidRequestSchema = require("../../utils/errors/InvalidRequestSchema")

const schema = {
    type: "object",
    properties: {
      name: {type: "string", maxLength: 255}
    },
    required: ["name"],
    additionalProperties: false
}

const createGroup = async (req, res) => {
    const valid = ajv.validate(schema, req.body)
    const userId = res.locals.user._id

    if(!valid) {
       return next(InvalidRequestSchema.factory(ajv.errorsText()))
    }

    const newGroup = new Group({ name: req.body.name })
    newGroup.administrators.push(userId)
    newGroup.members.push(userId)

    await newGroup.save()

    res.json(newGroup)
}

module.exports = createGroup