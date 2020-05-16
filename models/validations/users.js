const { Joi } = require('celebrate');

const schemaValidateUserId = {
  params: Joi.object().keys({
    userId: Joi.string()
      .alphanum().length(24),
  }),
};

const schemaUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    about: Joi.string()
      .required().min(2).max(30),
  }).unknown(true),
};

const schemaUpdateUserAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string()
      .required(),
  }),
};

module.exports = {
  schemaValidateUserId,
  schemaUpdateUser,
  schemaUpdateUserAvatar,
};
