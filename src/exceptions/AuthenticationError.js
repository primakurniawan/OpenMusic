const ClientError = require("./ClientError");

class AuthenticationError extends ClientError {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = 401;
    this.name = "AuthenticationError";
  }
}

module.exports = AuthenticationError;
