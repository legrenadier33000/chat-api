const User = require('../../models/user')

const postUser = async (req, res) => {
    const newUser = new User(req.body)
    await newUser.save()

    req.send(JSON.stringify(newUser))
}

module.exports = postUser