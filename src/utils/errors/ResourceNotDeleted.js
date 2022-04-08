class ResourceNotDeleted extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotDeleted'
        this.statusCode = 500
    }

    static factory(message) {
        return new ResourceNotDeleted(message)
    }
}

module.exports = ResourceNotDeleted