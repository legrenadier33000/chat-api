class EmailAlreadyInUse extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailAlreadyInUse";
        this.code = 403
    }

    static factory(message='Email already in use') {
        return new EmailAlreadyInUse(message);
    }
}

module.exports = EmailAlreadyInUse;