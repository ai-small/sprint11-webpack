class Popup {

  constructor() {

    this.popup = document.querySelector('.popup');
    this.closeButton = document.querySelector('.popup__close');
    this._close = this._close.bind(this);
    this._escapeKeyPressed = this._escapeKeyPressed.bind(this);
    this._clickOutToClosePopup = this._clickOutToClosePopup.bind(this);

  }

  _open() {
    this.popup.classList.add('popup_is-opened');
  }

  _close() {

    const isImage = this.popup.firstElementChild.classList.contains('popup__content_image');

    if (!isImage && this.popup.classList.contains('popup_is-opened')) {

      this.popup.classList.remove('popup_is-opened');
      this.popup.querySelector('.popup__title').remove();

      this.popup.removeEventListener('input', this._inputHandler);
      this.popup.removeEventListener('submit', this._submitHandler);
      this.popup.querySelector('.popup__form').remove();

    } else if (isImage && this.popup.classList.contains('popup_is-opened')) {

      this.popup.classList.remove('popup_is-opened');

      const popupImageContent = this.popup.querySelector('.popup__content');

      popupImageContent.classList.remove('popup__content_image');
      popupImageContent.lastChild.remove();

    }

  }

  _escapeKeyPressed(event) {

    if (event.key === 'Escape') {
      this._close();
    }

  }

  _clickOutToClosePopup (event) {

    if (event.target.classList.contains('popup_is-opened')) {
      this._close();
    };

  }

  _disableButton = (button) => {

    button.setAttribute('disabled', 'disabled');
    button.classList.remove('popup__button_active')

  }

  setEventListeners() {

    this.closeButton.addEventListener('click', this._close);
    this.popup.addEventListener('click', this._clickOutToClosePopup);
    document.addEventListener('keydown', this._escapeKeyPressed);

  }

}



