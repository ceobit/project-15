const { Joi } = require('celebrate');

const schemaValidateId = {
  params: Joi.object().keys({
    Id: Joi.string()
      .alphanum().length(24),
  }),
};

module.exports = {
  schemaValidateId,
};
