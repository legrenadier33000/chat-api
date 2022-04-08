class ResourceNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFound'
    }

    static factory(message) {
        return new ResourceNotFound(message)
    }
}

module.exports = ResourceNotFound