class ResourceNotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceNotFound'
        this.code = 404
    }

    static factory(message) {
        return new ResourceNotFound(message)
    }
}

module.exports = ResourceNotFound