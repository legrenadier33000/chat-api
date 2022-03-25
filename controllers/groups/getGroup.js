const Group = require('../../models/group')

const getGroup = async (req, res) => {
    const group = Group.findOne({_id: req.body._id})
    req.send(JSON.stringify(group))
}

module.exports = getGroup