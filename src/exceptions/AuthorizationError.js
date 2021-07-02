const ClientError = require("./ClientError");

class AuthorizationError extends ClientError {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = 403;
    this.name = "AuthorizationError";
  }
}

module.exports = AuthorizationError;
