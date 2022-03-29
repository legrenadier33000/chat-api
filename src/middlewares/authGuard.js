const jwt = require('jsonwebtoken')

const APP_SECRET_KEY = process.env.APP_SECRET_KEY

const authguard = async (req, res, next) => {
    try {
        const reqJwt = req.headers?.jwt
    
        if(!reqJwt) {
            throw new Error("No JWT header")
        }

        const decoded = jwt.verify(reqJwt, APP_SECRET_KEY)

        if(!decoded) { 
            throw new Error("Invalid JWT")
        }
        
        // Embed the decoded JWT (user's info) to pass it to the next middleware
        res.locals.user = decoded
        next()
    } catch (e) {
        res.status(403).send(e.message)
    }
}

module.exports = authguard