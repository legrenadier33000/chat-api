class InvalidBearer extends Error {
    constructor(message) {
        super(message)
        this.name = "InvalidBearer"
        this.code = 400
    }

    static factory(message='Invalid JWT Bearer') {
        return new InvalidBearer(message)
    }
}

module.exports = InvalidBearer