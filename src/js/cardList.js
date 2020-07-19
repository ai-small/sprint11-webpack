class CardList {
  constructor(cardsContainer, api, createCard, createImagePopup) {

    this.cardsContainer = cardsContainer;
    this._api = api;
    this._createCard = createCard;
    this._createImagePopup = createImagePopup;

  }

  _addCard = (cardData, userId) => {
    this.cardsContainer.append(this._createCard(this._api)._create(cardData, this._createImagePopup, userId));
  }

  render = (cardsData, userInfo) => {

      cardsData.forEach(cardData => {
        this._addCard(cardData, userInfo.userId);
      })

  }
}

