const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = schema;
