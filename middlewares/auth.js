const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const { SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const cookie = req.cookies.jwt;

  if (!cookie) {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      const err = new UnauthorizedError('Авторизация не выполнена');
      return res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
    }
  }
  const token = cookie || authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    const error = new UnauthorizedError('Авторизация не выполнена');
    return res.status(error.statusCode || 500).send({ message: error.message || 'На сервере произошла ошибка' });
  }
  req.user = payload;
  return next();
};
