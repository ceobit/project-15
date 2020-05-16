const Card = require('../models/card');
const { NotFoundError, Forbidden } = require('../errors/errors');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        // return Promise.reject(new Forbidden('Нет прав на удаление карточки'));
        throw new Forbidden('Нет прав на удаление карточки');
      }
      return Card.findByIdAndRemove({ _id: cardId })
        .then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(() => new NotFoundError('Данные в базе данных не обнаружены'))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
