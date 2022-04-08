class InvalidCredentials extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidCredentials'
        this.statuscode = 403
    }

    static factory(message='Invalid credentials') {
        return new InvalidCredentials(message)
    }
}

module.exports = InvalidCredentials