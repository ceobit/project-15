const { accountSignIn } = require('./accountSignIn');
const { accountSignUp } = require('./accountSignUp');
const { schemaCreateCard } = require('./cards');
const { schemaUpdateUser, schemaUpdateUserAvatar } = require('./users');
const { schemaValidateId } = require('./commonValidate');

module.exports = {
  accountSignIn,
  accountSignUp,
  schemaCreateCard,
  schemaUpdateUser,
  schemaUpdateUserAvatar,
  schemaValidateId,
};
