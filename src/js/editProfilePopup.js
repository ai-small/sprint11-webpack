class EditProfilePopup extends Popup {

  static _markupEditPopup = `  
  <h3 class="popup__title">Редактировать профиль</h3>
  <form class="popup__form" name="edit" novalidate>
      <input type="text" name="name" class="popup__input popup__input_type_name" minlength="2" maxlength="30" required placeholder="Имя"><span class="error"></span>
      <input type="text" name="about" class="popup__input popup__input_type_about" minlength="2" maxlength="30" required placeholder="О себе"><span class="error"></span>
      <button type="submit" class="button popup__button popup__button_type_edit" disabled>Сохранить</button>
  </form>
  `;

  constructor(container, createUserInfo, createFormValidator, api, openEditButton, avatarContainer) {

    super();
    this.container = container;
    this.createUserInfo = createUserInfo;
    this.createFormValidator = createFormValidator;
    this._api = api;
    this.form = null;
    this.userInfo = null;
    this.openEditButton = openEditButton;
    this.avatarContainer = avatarContainer;
    this._open = this._open.bind(this);

  }

  _getTemplate = () => {

    const template = document.createElement('div');
    template.insertAdjacentHTML('afterbegin', EditProfilePopup._markupEditPopup);
    return template.children

  }

  _renderContent = (container) => {

    Array.from(this._getTemplate()).forEach(node => container.appendChild(node));
    this.form = container.querySelector('.popup__form');

    const popupFormEdit = document.forms.edit;
    const editName = popupFormEdit.elements.name;
    const editAbout = popupFormEdit.elements.about;

    this.userInfo = this.createUserInfo(this._api, this.openEditButton, this.avatarContainer);
    const profile = this.userInfo._getProfile();

    const api = this._api;
    const userInfo = this.userInfo;
    this.createFormValidator({ container, userInfo, api })._setEventListeners();
    this._setEventListeners();

    editName.value = profile.name;
    editAbout.value = profile.about;    

  }

  _open = () => {   

    super._open();
    this._renderContent(this.container);  

  }

  _submitHandler = (event) => {

    event.preventDefault();    
    const formElements = Array.from(this.form.elements);
    const inputs = formElements.filter(element => {
      if (element.type !== 'submit' && element.type !== 'button') return element
    })
    const button = this.form.querySelector('.button');

    const newUserData = {};
    inputs.forEach(input => {
      newUserData[`${input.getAttribute('name')}`] = input.value
    });

    button.textContent = 'Загрузка...';
    this._disableButton(button);

    this._api.setUserInfo(newUserData)
      .then(res => {

        this.userInfo.setUserInfo(res.name, res.about, res._id, res.avatar);
        this.userInfo.updateUserInfo();
        this._close();

      })
      .catch(err => {
        console.log(err);
      })
  }

  _setEventListeners = () => {

    super.setEventListeners();
    this.form.addEventListener('submit', this._submitHandler);

  }

}

