import { Popup } from "./popup.js";

export class NewPlacePopup extends Popup {

  static _markupNewPlacePopup = `  
  <h3 class="popup__title">Новое место</h3>
  <form class="popup__form" name="new" novalidate>
      <input type="text" name="name" class="popup__input popup__input_type_name" minlength="2" maxlength="30" required placeholder="Название"><span class="error"></span>
      <input type="url" name="link" class="popup__input popup__input_type_link-url" required placeholder="Ссылка на картинку"><span class="error"></span>
      <button type="submit" class="button popup__button" disabled>+</button>
  </form>  
  `;

  constructor(container, createFormValidator, addCard, createImagePopup, api) {

    super();
    this.container = container;
    this.createFormValidator = createFormValidator;
    this.addCard = addCard;
    this.createImagePopup = createImagePopup;
    this._api = api;
    this.form = null;
    this._open = this._open.bind(this);

  }

  _getTemplate = () => {

    const template = document.createElement('div');
    template.insertAdjacentHTML('afterbegin', NewPlacePopup._markupNewPlacePopup);
    return template.children

  }

  _renderContent = (container) => {

    Array.from(this._getTemplate()).forEach(node => container.appendChild(node));
    this.form = container.querySelector('.popup__form');

    const addCard = this.addCard;
    const createImagePopup = this.createImagePopup;
    const api = this._api;

    this.createFormValidator({ container, addCard, createImagePopup, api })._setEventListeners();
    this._setEventListeners();    

  }

  _open() {

    super._open();
    this._renderContent(this.container);

  }

  _submitHandler = (event) => {

    event.preventDefault();
    this.form = event.target;
    const formElements = Array.from(this.form.elements);
    const inputs = formElements.filter(element => {
      if (element.type !== 'submit' && element.type !== 'button') return element
    })
    const button = this.form.querySelector('.button');

    const cardData = {};
    inputs.forEach(input => {
      cardData[`${input.getAttribute('name')}`] = input.value
    });

    button.textContent = 'Загрузка...';
    this._disableButton(button);

    this._api.addCard(cardData)
      .then(res => {

        this.addCard(res, res.owner._id)
        this.form.reset();
        this._close();

      })
      .catch(err => {
        console.log(err);
      })
  }

  _setEventListeners () {

    super.setEventListeners();
    this.form.addEventListener('submit', this._submitHandler);    

  }
}



