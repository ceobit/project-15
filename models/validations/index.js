const { accountSignIn } = require('./accountSignIn');
const { accountSignUp } = require('./accountSignUp');
const { schemaCreateCard, schemaValidateCardId } = require('./cards');
const { schemaValidateUserId, schemaUpdateUser, schemaUpdateUserAvatar } = require('./users');

module.exports = {
  accountSignIn,
  accountSignUp,
  schemaCreateCard,
  schemaValidateCardId,
  schemaValidateUserId,
  schemaUpdateUser,
  schemaUpdateUserAvatar,
};
