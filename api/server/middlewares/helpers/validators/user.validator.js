const Joi = require('Joi');

const createUserValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(15).required(),
  password: Joi.string().min(8).required().messages({
    "string.min": `Password should have a minimum length of 8 characters`,
    "string.base": `Password should have an uppercase, lowercase and digit`,
    "string.pattern.base": `Password should have an uppercase, lowercase and digit`,
    "string.empty": `Password cannot be empty`,
    "string.required": `Password is required`,
  }),
  confirmPassword: Joi.ref('password'),
});

module.exports = {createUserValidator};