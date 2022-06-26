const Joi = require('Joi');

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required().messages({
    "string.min": `Password should have a minimum length of 8 characters`,
    "string.base": `Password should have an uppercase, lowercase and digit`,
    "string.pattern.base": `Password should have an uppercase, lowercase and digit`,
    "string.empty": `Password cannot be empty`,
    "string.required": `Password is required`,
  }),
});

module.exports = {loginValidator};