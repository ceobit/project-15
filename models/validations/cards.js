const { Joi } = require('celebrate');
const validator = require('validator');

const schemaCreateCard = {
  body: Joi.object().keys({
    name: Joi.string()
      .required().min(2).max(30),
    link: Joi.string()
      .required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Ссылка имеет не верный формат');
      }),
  }),
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
