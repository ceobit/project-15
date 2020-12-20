export default class FormValidator {

  checkInputValidity(form) {
    let status = [];
    for (let i = 0; i <= form.elements.length - 1; i++) {
      /*
       можно лучше : используйте for of для перебора массива с объектами
       https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
       как пример:

       const array1 = ['a', 'b', 'c'];
       for (const element of array1) {
        console.log(element);
       }

      */
      if (!form.elements[i].checkValidity() && form.elements[i].tagName ===
        'INPUT') {
        this.setErrorMessage(form.elements[i],
          this.getCustomValidation(form.elements[i]));
        status.push(form.elements[i]);
      }
    }
    return status.length <= 0;
  }

  setSubmitButtonState(form) {
    const popupButton = document.querySelector('.popup__button');
    this.checkInputValidity(form) ?
      popupButton.classList.add('popup__button_valid') :
      popupButton.classList.remove('popup__button_valid');
  }

  setEventListeners(event) {
    const form = event.target.closest('.popup__form');
    this.setSubmitButtonState(form);
  }

  setErrorMessage(input, message) {
    let listPopupError = document.querySelectorAll('.popup__error');
    listPopupError.forEach(function(item) {
      if (message !== '' && item.previousElementSibling.name === input.name) {
        item.textContent = message;
      }
    });
  }

  //Определяем тип ошибки
  getCustomValidation(input) {
    let errorMessage;
    this.setPattern(input);

    if (input.validity.patternMismatch) {
      input.name === 'link' ?
        errorMessage = 'There should be a link here' :
        input.name === 'login' ? null :
        errorMessage = 'Must be between 2 and 30 characters';
    }
    if (input.validity.valueMissing) {
      errorMessage = 'It is a required field';
    }
    return errorMessage;
  }

  setPattern(input) {
    input.name === 'link' ?
      input.setAttribute('pattern',
        `^(https?:\\/\\/)?([\\w-]{1,32}\\.[\\w-]{1,32})[^\\s@]*$`) :
      (input.name === 'password' || input.name === 'login')  ?
        null :
        input.setAttribute('pattern', `[A-Za-zА-Яа-яЁё][^0-9]{1,30}`);
  }
}



