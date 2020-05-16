const { Joi } = require('celebrate');

const schemaCreateCard = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    link: Joi.string()
      .required(),
    createdAt: Joi.date().default(Date.now()),
  }).unknown(true),
};

const schemaValidateCardId = {
  params: Joi.object().keys({
    cardId: Joi.string()
      .alphanum().length(24),
  }),
};

module.exports = {
  schemaCreateCard,
  schemaValidateCardId,
};
