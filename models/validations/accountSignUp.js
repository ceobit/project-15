const { Joi } = require('celebrate');
const validator = require('validator');

const accountSignUp = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    about: Joi.string()
      .required().min(2).max(30),
    avatar: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Ссылка имеет не верный формат');
      }),
    email: Joi.string()
      .required().email(),
    password: Joi.string()
      .required().min(8),
  }),
};

module.exports.accountSignUp = accountSignUp;
