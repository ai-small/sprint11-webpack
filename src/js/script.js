'use strict';

(function () {

  const cardsContainer = document.querySelector('.places-list');
  const containerPopupContent = document.querySelector('.popup__content');

  const openAddCardButton = document.querySelector('.user-info__button_type_new');
  const openEditButton = document.querySelector('.user-info__button_type_edit');

  const avatarContainer = document.querySelector('.user-info__photo');

  const createCard = (...arg) => new Card(...arg);
  const createImagePopup = (...arg) => new ImagePopup(...arg);
  const createFormValidator = (...arg) => new FormValidator(...arg);
  const createUserInfo = (...arg) => new UserInfo(...arg);
  const getInitialCards = () => {

    api.getCards()
      .then(res => {
        cardList.render(res, userInfo)
      })
      .catch(err => {
        console.log(err);
      })

  }

  const api = new Api(config);
  const cardList = new CardList(cardsContainer, api, createCard, createImagePopup);
  const placeForm = new NewPlacePopup(containerPopupContent, createFormValidator, cardList._addCard, createImagePopup, api);
  const editProfileForm = new EditProfilePopup(containerPopupContent, createUserInfo, createFormValidator, api, openEditButton, avatarContainer);
  const updateAvatarPopup = new UpdateAvatarPopup(containerPopupContent, avatarContainer, createFormValidator, api);
  const userInfo = createUserInfo(api, openEditButton, avatarContainer);


  //main

  api.getUserInfo()
    .then(res => {

      userInfo.setUserInfo(res.name, res.about, res._id, res.avatar);
      userInfo.updateUserInfo();

    })
    .catch(err => {
      console.log('Error: ', err);
    })


  getInitialCards();

  openAddCardButton.addEventListener('click', placeForm._open);
  openEditButton.addEventListener('click', editProfileForm._open);
  avatarContainer.addEventListener('click', updateAvatarPopup._open);

})();

