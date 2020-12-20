export default class Popup {

  constructor(
    propertiesMesto, propertiesProfil, cardList, profil, formValidator, api) {
    this.propertiesMesto = propertiesMesto;
    this.propertiesProfil = propertiesProfil;
    this.cardList = cardList;
    this.profil = profil;
    // this.initialCards = initialCards;
    this.formValidator = formValidator;
    this.api = api;
  }

  //Все формы создаю не в HTML, а здесь
  create(classList, properties) {
    let template;
    if (classList.contains('place-card__image')) {
      template = `
            <div class="popup popup_is-opened">
                <div class="popup__content popup__image">
                    <div class="popup__close"></div>
                </div>
            </div>`;

    } else if (classList.contains('user-info__photo')) {
      template = `
            <div class="popup popup_is-opened">
                <div class="popup__content">
                    <div class="popup__close"></div>
                    <h3 class="popup__title">Update avatar</h3>
                    <form class="popup__form" name="avatar">
                        <input type="text" name="link" class="popup__input" placeholder="Link to avatar" required>
                        <p class="popup__error">It is a required field</p>
                        <button type="submit" class="button popup__button">Save</button>
                    </form>
                </div>
            </div>`;
    } else if (classList.contains('root__auth')) {
      template = `
            <div class="popup popup_is-opened">
                <div class="popup__content">
                    <div class="popup__close"></div>
                    <h3 class="popup__title">Login</h3>
                    <form class="popup__form" name="auth">
                        <input type="text" name="login" class="popup__input" placeholder="login" required>
                        <p class="popup__error">It is a required field</p>
                         <input type="password" name="password" class="popup__input" placeholder="password" required>
                         <p class="popup__error">It is a required field</p>
                        <button type="submit" class="button popup__button">Save</button>
                    </form>
                </div>
            </div>`;
    } else {
      template = `
    <div class="popup popup_is-opened">
       <div class="popup__content">
            <div class="popup__close"></div>
            <h3 class="popup__title">${properties.title}</h3>
            <form class="popup__form" name="${properties.formName}">
                <input type="text" name="${properties.nameFieldOne}" class="popup__input" placeholder="${properties.FieldOne}" value="${properties.valueFieldOne}"  required>
                <p class="popup__error">It is a required field</p>
                <input type="text" name="${properties.nameFieldTwo}" class="popup__input" placeholder="${properties.FieldTwo}" value="${properties.valueFieldTwo}" required>
                 <p class="popup__error">It is a required field</p>
                <button type="submit" class="button popup__button ${properties.buttonClass}">${properties.button}</button>
            </form>
        </div>
    </div>`;
    }
    document.querySelector('.root').insertAdjacentHTML('afterEnd', template);
  }

  open(event) {
    try {
      //Выбираем какой popup создать

      //Popup для открытия картинки
      if (event.target.classList.contains('place-card__image')) {
        const imagePath = event.target.getAttribute('style');
        this.create(event.target.classList);
        document.querySelector('.popup__content').
          setAttribute('style', imagePath);
      } else {
        //Это создаются popup с формами
        if (event.target.classList.contains('user-info__button')) {
          this.create(event.target.classList, {...this.propertiesMesto});
        }
        else if (event.target.classList.contains('user-info__button_edit')) {
          this.create(event.target.classList, {...this.propertiesProfil});
        }
        else {
          this.create(event.target.classList);
        }

        //ОБРАБОТЧИКИ POPUP c формами
        //Обработчик отправление данных формы

        document.querySelector('.popup__form').
          addEventListener('submit', this.sendForm.bind(this));

        document.querySelector('.popup').
          addEventListener('input',
            this.formValidator.setEventListeners.bind(this.formValidator));

        //Устанавливаем статус кнопки формы при открытии popup
        this.formValidator.setSubmitButtonState(
          document.querySelector('.popup__form'));

      }
      //Обработчик на закрытие обеих форм Popup
      document.querySelector('.popup__close').
        addEventListener('click', this.close.bind(this));
    } catch (e) {

    }

  }

  close() {
    document.querySelector('.popup').remove();
  }

  //Отправим данные через форму
  sendForm(event) {
    event.preventDefault(); //остановим перезагрузку страницы

    //Если это форма добавления картинки
    if (event.target.getAttribute('name') === 'new') {
      const popupForm = document.forms.new;
      //Добавлем картинку на сервер и сразу выводим
      this.api.sendNewCard(popupForm.elements).then(() => {
        this.cardList.render();
        document.querySelector('.popup__button').textContent = 'Loading...';
      });
    }

    //Если это форма редактирования профиля
    if (event.target.getAttribute('name') === 'profil') {
      this.profil.setUserInfo();
    }

    //Если это форма редактирования аватара
    if (event.target.getAttribute('name') === 'avatar') {
      this.profil.changeUserAvatar();
    }

    //Если это форма авторизации
    if (event.target.getAttribute('name') === 'auth') {
      this.profil.login();
    }

    //Чтобы очень быстро не закрылось окно и увидели изменение текста кнопки
    setTimeout(() => this.close(), 1000);
  }

}
