import { Popup } from "./popup.js";

export class ImagePopup extends Popup {

  constructor(cardImageContainer) {

    super();
    this.cardImageContainer = cardImageContainer;
    this.popupImage = document.querySelector('.popup__content');    
    this.open = this.open.bind(this);

  }

  _renderContent = (cardImage, popupImage) => {

    const imageSourse = cardImage.style.backgroundImage.slice(5, -2);
    const image = document.createElement('img');
    const card = cardImage.parentNode;
    const cardName = card.querySelector('.place-card__name').textContent;

    popupImage.classList.add('popup__content_image');

    //добавить атрибуты
    image.setAttribute('src', imageSourse);
    image.setAttribute('alt', cardName);
    image.setAttribute('class', 'popup__image');

    //добавить узел
    popupImage.appendChild(image);

  }

  open = (event) => {
    
    super._open();
    this._renderContent(event.target, this.popupImage);
    
  }

  _setEventListeners = (cardImage) => {

    cardImage.addEventListener('click', this.open);
        
  }

}

