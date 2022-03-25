const Group = require('../../models/group')

const postGroup = async (req, res) => {
    const newGroup = new Group({name: req.body.name})
    await newGroup.save()

    req.send(JSON.stringify(newGroup))
}

module.exports = postGroup