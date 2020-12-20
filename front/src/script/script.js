import Api from './api';
import Card from './card';
import CardList from './cardList';
import FormValidator from './formValidator';
import Popup from './popup';
import UserInfo from './userInfo';
import '../pages/index.css';

//спомощью IIFE убираем переменные из глобальной видимости
(function () {

    // Объекты для формирования содержимого popup
    const propertiesMesto = {
        title: "New place",
        formName: "new",
        nameFieldOne: "name",
        nameFieldTwo: "link",
        FieldOne: "Name",
        FieldTwo: "Image link",
        valueFieldOne: "",
        valueFieldTwo: "",
        button: '+',
        // buttonStyle: "style='font-size: 36px'"
        buttonClass: 'mesto__button'
    };

    const propertiesProfil = {
        title: "Edit profile",
        formName: "profil",
        nameFieldOne: "name",
        nameFieldTwo: "job",
        FieldOne: "First and Last Names",
        FieldTwo: "About Me",
        valueFieldOne: document.querySelector('.user-info__name').textContent,
        valueFieldTwo: document.querySelector('.user-info__job').textContent,
        button: 'Save',
        // buttonStyle: "style='font-size: 14px'"
        buttonClass: 'profil__button'
    };


    const playList = document.querySelector('.places-list');

    const api = new Api({
        baseUrl: 'https://nomoreparties.co/cohort8/',
        headers: {
            authorization: '63a34e12-9976-4dac-b99a-14f9c916a7bd',
            'Content-Type': 'application/json'
        }
    });

  // const api = new Api({
  //   baseUrl: 'http://localhost:3000/',
  //   headers: {
  //     // authorization: '63a34e12-9976-4dac-b99a-14f9c916a7bd',
  //     'Content-Type': 'application/json'
  //   }
  // });

    const card = new Card(api);

    const cardList = new CardList(playList, api, card);
    cardList.render();

    const profil = new UserInfo(api);
    profil.getUserInfo();

    const formValidator = new FormValidator();

    const popup = new Popup(propertiesMesto, propertiesProfil, cardList, profil, formValidator, api);


    //Обработчики событий

    playList.addEventListener('click', card.like.bind(card));

    playList.addEventListener('click', card.remove.bind(card));

    document.querySelector('.user-info__button')
        .addEventListener('click', popup.open.bind(popup));

    document.querySelector('.user-info__button_edit')
        .addEventListener('click', popup.open.bind(popup));

    document.querySelector('.user-info__photo')
        .addEventListener('click', popup.open.bind(popup));

    debugger
    document.querySelector('.root__auth')
        .addEventListener('click', popup.open.bind(popup));

    playList.addEventListener('click', popup.open.bind(popup));


})();
