const { Group } = require('../../models/group')

const getGroup = async (req, res) => {
    try {
        // TODO: Restrain viewing a group to its members only
        const group = await Group.findById(req.params.id).lean()
        
        if(!group) {
            throw new Error("Group not found")
        }

        res.send(JSON.stringify(group))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = getGroup