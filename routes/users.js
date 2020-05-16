const routerUsers = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaValidateUserId, schemaUpdateUser, schemaUpdateUserAvatar } = require('../models/validations');
const {
  getAllUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

routerUsers.get('/users', getAllUsers);
routerUsers.get('/users/:userId', celebrate(schemaValidateUserId), getUser);
routerUsers.patch('/users/me', celebrate(schemaUpdateUser), updateUser);
routerUsers.patch('/users/me/avatar', celebrate(schemaUpdateUserAvatar), updateUserAvatar);

module.exports = routerUsers;
