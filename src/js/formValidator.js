export class FormValidator {

  constructor(parameters) {

    this.popup = parameters.container;
    this.form = this.popup.querySelector('.popup__form');
    this.formElements = Array.from(this.form.elements);
    this.inputs = this.formElements.filter(element => {
      if (element.type !== 'submit' && element.type !== 'button') return element
    })
    this.button = this.form.querySelector('.button');
    this.addCard = parameters.addCard;
    this._createImagePopup = parameters.createImagePopup;

    this._api = parameters.api;
    this.errorMessages = {
      valueMissing: 'Это обязательное поле',
      valueLength: 'Должно быть от 2 до 30 символов',
      typeMismatch: 'Здесь должна быть ссылка',
    }

  }

  _showErrorMessage(input) {

    const error = input.nextElementSibling;

    error.textContent = input.validationMessage;
    input.classList.add('popup__input_error');

  }

  _checkInputValidity = (input) => {

    const error = input.nextElementSibling;

    this._resetError(error);
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.valueMissing);
      this._showErrorMessage(input);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.valueLength);
      this._showErrorMessage(input);
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.typeMismatch);
      this._showErrorMessage(input);
      return false
    }

    return true

  }

  _isValidForm = (form) => {

    let isValidForm = true;

    isValidForm = this.inputs.every(input => input.validity.valid);
    this._setSubmitButtonState(isValidForm);

    return isValidForm
  }

  _resetError = (error) => {

    error.textContent = '';
    error.previousSibling.classList.remove('popup__input_error');

  }

  _disableButton = (button) => {

    button.setAttribute('disabled', 'disabled');
    button.classList.remove('popup__button_active')

  }

  _setSubmitButtonState = (isValid) => {

    if (isValid) {

      this.button.removeAttribute('disabled');
      this.button.classList.add('popup__button_active')

    } else {
      if (this.button.classList.contains('popup__button_active')) {

        this._disableButton(this.button);

      }
    }

  }

  _inputHandler = (event) => {

    const input = event.target;

    this._checkInputValidity(input);
    this._isValidForm(this.form);

  }

  _setEventListeners = () => {

    this.form.addEventListener('input', this._inputHandler);

  }
}
