class EmailAlreadyInUse extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailAlreadyInUse";
    }

    static factory(message='Email already in use') {
        return new EmailAlreadyInUse(message);
    }
}

module.exports = EmailAlreadyInUse;