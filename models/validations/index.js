const { accountSignIn } = require('./accountSignIn');
const { accountSignUp } = require('./accountSignUp');
const { schemaCreateCard, schemaValidateCardId } = require('./cards');
const { schemaUpdateUser, schemaUpdateUserAvatar, schemaValidateUserId } = require('./users');

module.exports = {
  accountSignIn,
  accountSignUp,
  schemaCreateCard,
  schemaUpdateUser,
  schemaUpdateUserAvatar,
  schemaValidateCardId,
  schemaValidateUserId,
};
