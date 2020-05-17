const { Joi } = require('celebrate');

const schemaCreateCard = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    link: Joi.string()
      .pattern(new RegExp('(?:http|https):\\/\\/((?:[\\w-]+)(?:\\.[\\w-]+)+)(?:[\\w.,@?^:\\/~+#-]*[\\w@?^\\/~+#-])?')).required(),
  }),
};

module.exports = {
  schemaCreateCard,
};
