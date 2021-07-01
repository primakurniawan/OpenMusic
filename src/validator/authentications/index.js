const InvariantError = require("../../exceptions/InvariantError");
const {
  postAuthenticationSchema,
  putAuthenticationSchema,
  deleteAuthenticationSchema,
} = require("./schema");

const AuthenticationValidator = {
  validatePostAuthentications: (payload) => {
    const validationResult = postAuthenticationSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePutAuthentications: (payload) => {
    const validationResult = putAuthenticationSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteAuthentications: (payload) => {
    const validationResult = deleteAuthenticationSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AuthenticationValidator;
