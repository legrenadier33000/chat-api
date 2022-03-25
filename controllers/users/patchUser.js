const User = require('../../models/user')

const patchUser = async (req, res) => {
    const user = User.findOne({pseudo: req.body.pseudo})
    
    user.pseudo = req.body.pseudo
    await user.save()
    req.send(JSON.stringify(user))
}

module.exports = patchUser