const jwt = require('jsonwebtoken')

const APP_SECRET_KEY = process.env.APP_SECRET_KEY

const authguard = async (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization
        
        if(!authHeader) { throw new Error("No Authorization header") }

        const array = authHeader.split(' ')

        if(array.length !== 2) { throw new Error("Invalid Authorizaiton header") } 

        const bearer = array[0]
        const token = array[1]

        if(bearer !== "Bearer") { throw new Error("Invalid Bearer type")}

        const decoded = jwt.verify(token, APP_SECRET_KEY)

        if(!decoded) { throw new Error("Invalid JWT") }
        
        res.locals.user = decoded
        return next()
    } catch (e) {
        res.status(403).send(e.message)
    }
}

module.exports = authguard