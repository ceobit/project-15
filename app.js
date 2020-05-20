const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { accountSignIn, accountSignUp } = require('./models/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, dbURI } = require('./config');

const app = express();

//  Подключаемся к серверу mongo
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
});

//  Успешно подключились к БД
mongoose.connection.on('connected', () => {
  console.log(`Mongoose запущен ${dbURI}`);
  app.listen(PORT, () => {
    console.log('Сервер запущен');
  });
});

//  Ошибка подключения к БД
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose ошибка подключения: ${err}`);
});

//  Отключились от БД
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose подключение завершено');
});

//  Заполняем req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//  логгер запросов
app.use(requestLogger);

//  Роуты без без авторизации
app.post('/signin', celebrate(accountSignIn), login);
app.post('/signup', celebrate(accountSignUp), createUser);

//  Роуты с авторизацией
app.use(auth, routerUsers);
app.use(auth, routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// логгер ошибок
app.use(errorLogger);

//  Обработчик ошибок celebrate
app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'На сервере произошла ошибка' });
  next();
});
