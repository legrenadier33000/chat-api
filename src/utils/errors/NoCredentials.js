class NoCredentials extends Error {
    constructor(message) {
        super(message)
        this.name = 'NoCredentials'
        this.statusCode = 403
    }

    static factory(message='No credentials in request\'s header') {
        return new NoCredentials(message)
    }
}

module.exports = NoCredentials