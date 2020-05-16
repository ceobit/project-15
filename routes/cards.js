const routerCards = require('express').Router();
const { celebrate } = require('celebrate');
const { schemaCreateCard, schemaValidateCardId } = require('../models/validations');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');


routerCards.get('/cards', getAllCards);
routerCards.post('/cards', celebrate(schemaCreateCard), createCard);
routerCards.delete('/cards/:cardId', celebrate(schemaValidateCardId), deleteCard);
routerCards.put('/cards/:cardId/likes', celebrate(schemaValidateCardId), likeCard);
routerCards.delete('/cards/:cardId/likes', celebrate(schemaValidateCardId), dislikeCard);

module.exports = routerCards;
