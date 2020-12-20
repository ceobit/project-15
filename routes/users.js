const routerUsers = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaUpdateUser, schemaUpdateUserAvatar, schemaValidateUserId, accountSignIn } = require('../models/validations');
const {
  getAllUsers, getUser, updateUser, updateUserAvatar, login
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:userId', celebrate(schemaValidateUserId), getUser);
routerUsers.patch('/users/me', celebrate(schemaUpdateUser), updateUser);
routerUsers.patch('/users/me/avatar', celebrate(schemaUpdateUserAvatar), updateUserAvatar);
routerUsers.post('/users/signin', celebrate(accountSignIn), login);

module.exports = routerUsers;
