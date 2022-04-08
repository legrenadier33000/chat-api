class InsuficientCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = 'InsuficientCredentials'
    this.statusCode = 403
  }

    static factory(message='Insuficient credentials to perform this operation') {
        return new InsuficientCredentials(message)
    }
}

module.exports = InsuficientCredentials