class InvalidRequestSchema extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidRequestSchema'
  }

  static factory(message='Invalid request schema') {
    return new InvalidRequestSchema(message)
  }
}

module.exports = InvalidRequestSchema