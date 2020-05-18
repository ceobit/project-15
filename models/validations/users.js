const { Joi } = require('celebrate');
const validator = require('validator');

const schemaUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    about: Joi.string()
      .required().min(2).max(30),
  }),
};

const schemaUpdateUserAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Ссылка имеет не верный формат');
      }),
  }),
};

const schemaValidateUserId = {
  params: Joi.object().keys({
    userId: Joi.string()
      .alphanum().length(24),
  }),
};

module.exports = {
  schemaUpdateUser,
  schemaUpdateUserAvatar,
  schemaValidateUserId,
};
