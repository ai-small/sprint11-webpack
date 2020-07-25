export class Api {
  constructor(config) {

    this._getUserInfoConfig = config.getUserInfo;
    this._cardListConfig = config.cardList;
    this._updateUserInfoConfig = config.updateUserInfo;
    this._addNewCardConfig = config.addNewCard;
    this._deleteCardConfig = config.deleteCard;
    this._putLikeConfig = config.putLike;
    this._deleteLikeConfig = config.deleteLike;
    this._updateAvatarConfig = config.updateAvatar;

  }

  _processPromise = (res) => {

      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);

  }

  getUserInfo = async () => {

    const res = await fetch(this._getUserInfoConfig.url, {
      headers: this._getUserInfoConfig.headers,
    });
    return this._processPromise(res);
  }

  setUserInfo = async (userInfo) => {

    const res = await fetch(this._updateUserInfoConfig.url, {
      method: this._updateUserInfoConfig.method,
      headers: this._updateUserInfoConfig.headers,
      body: JSON.stringify(userInfo),
    });
    return this._processPromise(res);

  }

  getCards = async () => {

    const res = await fetch(this._cardListConfig.url, {
      headers: this._cardListConfig.headers,
    });
    return this._processPromise(res);

  }

  addCard = async (cardData) => {

    const res = await fetch(this._addNewCardConfig.url, {
      method: this._addNewCardConfig.method,
      headers: this._addNewCardConfig.headers,
      body: JSON.stringify(cardData),
    });
    return this._processPromise(res);

  }

  deleteCard = async (cardId) => {

    const res = await fetch(`${this._deleteCardConfig.url}/${cardId}`, {
      method: this._deleteCardConfig.method,
      headers: this._deleteCardConfig.headers,
    });
    return this._processPromise(res);

  }

  putLike = async (cardId) => {

    const res = await fetch(`${this._putLikeConfig.url}/${cardId}`, {
      method: this._putLikeConfig.method,
      headers: this._putLikeConfig.headers,
    });
    return this._processPromise(res);
  }

  deleteLike = async (cardId) => {

    const res = await fetch(`${this._deleteLikeConfig.url}/${cardId}`, {
      method: this._deleteLikeConfig.method,
      headers: this._deleteLikeConfig.headers,
    });
    return this._processPromise(res);

  }

  updateAvatar = async (avatarData) => {

    const res = await fetch(this._updateAvatarConfig.url, {
      method: this._updateAvatarConfig.method,
      headers: this._updateAvatarConfig.headers,
      body: JSON.stringify(avatarData),
    });
    return this._processPromise(res);

  }

}
