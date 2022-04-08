class InvalidAuthorizationHeader extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidAuthorizationHeader"
        this.code = 400
    }

    static factory(message='Invalid Authorization header') {
        return new InvalidAuthorizationHeader(message)
    }
}

module.exports = InvalidAuthorizationHeader