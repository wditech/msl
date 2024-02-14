const utility = {};

utility.resMessage = (res, status, ok, message) => {
  res.status(status).json({
    ok,
    message,
  });
};

// validation
const Joi = require("@hapi/joi");

utility.schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

utility.schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = utility;
