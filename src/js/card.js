class Card {

  static _markupCard = `
  <div class="place-card">
        <div class="place-card__image" style="">
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <div class="place-card__like-container">
            <button class="place-card__like-icon"></button>
            <span class="place-card__like-count"></span>
          </div>
        </div>
  </div>
  `;

  constructor(api) {

    this._api = api;

  }

  _getTemplate = () => {

    const template = document.createElement('div');
    template.insertAdjacentHTML('afterbegin', Card._markupCard);
    return template.firstElementChild

  }

  _create = (cardData, createImagePopup, userId) => {

    const cardContainer = this._getTemplate();
    cardContainer.setAttribute('data-card-id', cardData._id)

    const cardLikeButton = cardContainer.querySelector('.place-card__like-icon');
    const likeCountSpan = cardContainer.querySelector('.place-card__like-count');
    const isLiked = !!(cardData.likes.find(item => item._id === userId));

    const cardImage = cardContainer.querySelector('.place-card__image');
    const cardDescription = cardContainer.querySelector('.place-card__name');

    cardImage.setAttribute('style', `background-image: url(${cardData.link})`);

    if (cardData.owner._id === userId) {

      const cardDeleteButton = document.createElement('button');
      cardDeleteButton.classList.add('place-card__delete-icon');

      cardImage.appendChild(cardDeleteButton);
      this._setEventListeners('', cardDeleteButton);

    }

    cardDescription.textContent = cardData.name;
    likeCountSpan.textContent = cardData.likes.length;

    if (isLiked) {
      cardLikeButton.classList.add('place-card__like-icon_liked');
    }

    this._setEventListeners(cardLikeButton, '');
    createImagePopup(cardImage)._setEventListeners(cardImage);

    return cardContainer

  }

  _like = (likeIconClick) => {

    const card = likeIconClick.target.closest('.place-card');
    const cardId = card.dataset.cardId;
    const likeCount = card.querySelector('.place-card__like-count');

    if (likeIconClick.target.classList.contains('place-card__like-icon_liked')) {

      this._api.deleteLike(cardId)
        .then(res => {

          likeCount.textContent = res.likes.length;
          likeIconClick.target.classList.remove('place-card__like-icon_liked');

        })
        .catch(err => {
          console.log(err);
        })
    } else {

      this._api.putLike(cardId)
        .then(res => {

          likeCount.textContent = res.likes.length;
          likeIconClick.target.classList.toggle('place-card__like-icon_liked');

        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  _remove = (event) => {

    event.stopPropagation();

    if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
      const card = event.target.closest('.place-card');
      const cardId = card.dataset.cardId;

      this._api.deleteCard(cardId)
        .then(res => {

          this._removeEventListeners(card);
          card.remove();

        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  _removeEventListeners = (card) => {

    card.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
    card.querySelector('.place-card__like-icon').removeEventListener('click', this._like);

  }

  _setEventListeners = (cardLikeButton, cardDeleteButton) => {

    if (cardLikeButton) {
      cardLikeButton.addEventListener('click', this._like);
    }

    if (cardDeleteButton) {
      cardDeleteButton.addEventListener('click', this._remove);
    }
  }
}
