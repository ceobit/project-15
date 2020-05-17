const routerCards = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaCreateCard, schemaValidateId } = require('../models/validations');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');


routerCards.get('/cards', getAllCards);
routerCards.post('/cards', celebrate(schemaCreateCard), createCard);
routerCards.delete('/cards/:cardId', celebrate(schemaValidateId), deleteCard);
routerCards.put('/cards/:cardId/likes', celebrate(schemaValidateId), likeCard);
routerCards.delete('/cards/:cardId/likes', celebrate(schemaValidateId), dislikeCard);

module.exports = routerCards;
