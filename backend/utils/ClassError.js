class ClassError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ClassError;
