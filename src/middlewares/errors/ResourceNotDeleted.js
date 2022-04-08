class ResourceNotDeleted extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotDeleted'
    }

    static factory(message) {
        return new ResourceNotDeleted(message)
    }
}

module.exports = ResourceNotDeleted