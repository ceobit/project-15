# Mesto

_v01.4_ after review #3

Проект, реализованный в рамках проектной работы № 15 Яндекс практикума.

_ip 84.201.146.240_<br>
_www.api.it-todo.ru_

## Задачи: 

1.  Реализовал централизованную обработку ошибок;
2.  Добавил валидацию запросов;
3.  Реализовал логгирование запросов и ошибок;
4.  Создал облачный сервер и развернул API;
5.  Создал .env файл 
6.  В проекте реализованы следующие роуты: 
<ul>
<li>POST /signup — создать нового пользователя</li>
<li>POST /signin — авторизация пользователя</li>
<li>GET /users - получает всех пользователей</li>
<li>GET /users/:usersId - получает конкретного пользователя</li>
<li>PATCH /users/me — обновляет профиль</li>
<li>PATCH /users/me/avatar — обновляет аватар</li>
<li>GET /cards - получает все карточки</li>
<li>POST /cards - создает карточку</li>
<li>DELETE /cards/:cardId - удаляет карточку</li>
<li>PUT /cards/:cardId/likes — поставить лайк карточке</li>
<li>DELETE /cards/:cardId/likes — убрать лайк с карточки</li>
</ul>

## Как запустить

1. Клонировать репозиторий
`git clone https://github.com/ceobit/project-15`
2. Установить все зависимости проекта из package.json
`npm install`
3. Выполнить команду запуска
`npm run start`

## Использованные технологии
1. Node.js
2. Express.js
3. Ванильный JS
4. Git









