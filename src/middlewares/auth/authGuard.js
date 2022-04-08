const jwt = require("jsonwebtoken")

const InvalidAuthorizationHeader = require("../../utils/errors/InvalidAuthorizationHeader")
const InvalidBearer = require("../../utils/errors/InvalidBearer")
const InvalidJsonWebToken = require("../../utils/errors/InvalidJsonWebToken")

const APP_SECRET_KEY = process.env.APP_SECRET_KEY

const authguard = async (req, res, next) => {
    const authHeader = req.headers?.authorization
    
    if(!authHeader) { 
        return next(InvalidAuthorizationHeader.factory())
    }

    const array = authHeader.split(' ')

    if(array.length !== 2) { 
        return next(InvalidAuthorizationHeader.factory())
    } 

    const bearer = array[0]
    const token = array[1]

    if(bearer !== "Bearer") { 
        return next(InvalidBearer.factory())
    }

    const decoded = jwt.verify(token, APP_SECRET_KEY)

    if(!decoded) { 
        return next(InvalidJsonWebToken.factory())
    }
    
    res.locals.user = decoded
    next()
}

module.exports = authguard