class InvalidRequestSchema extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidRequestSchema'
    this.statusCode = 400
  }

  static factory(message='Invalid request schema') {
    return new InvalidRequestSchema(message)
  }
}

module.exports = InvalidRequestSchema