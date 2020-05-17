const { Joi } = require('celebrate');

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
      .pattern(new RegExp('(?:http|https):\\/\\/((?:[\\w-]+)(?:\\.[\\w-]+)+)(?:[\\w.,@?^:\\/~+#-]*[\\w@?^\\/~+#-])?')).required(),
  }),
};

module.exports = {
  schemaUpdateUser,
  schemaUpdateUserAvatar,
};
