class InvalidJsonWebToken extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidJsonWebToken"
        this.code = 400
    }

    static factory(message='Invalid JWT Bearer') {
        return new InvalidJsonWebToken(message)
    }
}

module.exports = InvalidJsonWebToken