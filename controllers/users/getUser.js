const User = require('../../models/user')

const getUser = async (req, res) => {
    const user = User.findOne({pseudo: req.body.pseudo})
    req.send(JSON.stringify(user))
}

module.exports = getUser