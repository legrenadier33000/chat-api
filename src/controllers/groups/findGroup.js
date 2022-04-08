const { Group } = require('../../models/group')
const ResourceNotFound = require('../../middlewares/errors/ResourceNotFound')

const getGroup = async (req, res, next) => {
    // TODO: Restrain viewing a group to its members only
    const group = await Group.findById(req.params.id).lean()
    
    if(!group) {
        next(ResourceNotFound.factory('Group not found'))
    }

    res.json(group)
}

module.exports = getGroup