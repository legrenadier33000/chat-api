class InvalidAuthType extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidAuthType'
        this.code = 403
    }

    static factory(message='Invalid authentication type') {
        return new InvalidAuthType(message)
    }
}

module.exports = InvalidAuthType