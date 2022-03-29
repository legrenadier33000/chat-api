const User = require('../../models/user')

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean()
        res.send(JSON.stringify(user))
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = getUser