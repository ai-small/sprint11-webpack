class UserInfo {

  constructor (api, openEditButton, avatarContainer) {

    this.userInfoName = document.querySelector('.user-info__name');
    this.userInfoJob = document.querySelector('.user-info__job');   
    this.name = '';
    this.userId = '';
    this.job = '';
    this.userInfoAvatar = avatarContainer;
    this.api = api;
    this.openEditButton = openEditButton;

  }
 
  setUserInfo = (name, about, userId, avatar) => {

        this.userInfoAvatar.style.backgroundImage = `url('${avatar}')`
        this.name = name;
        this.job = about;
        this.userId = userId;
        this.openEditButton.removeAttribute('disabled');

  }

  _getProfile = () => {

    //забрать подгруженные данные из ноды, проверка на наличие данных
    if (this.userInfoName.textContent && this.userInfoJob.textContent) {

      const userInfo = {
        name: this.userInfoName.textContent,
        about: this.userInfoJob.textContent,
      }

      return userInfo

    } else {

      //что делать, если с сервера данные не пришли
      console.log('Дождитесь загрузки данных профиля')

    }

  }

  updateUserInfo = () => {

    //set new info into node
    this.userInfoName.textContent = this.name;
    this.userInfoJob.textContent = this.job;

  }


}