class UpdateAvatarPopup extends Popup {

  static _markupUpdateAvatarPopup = `  
  <h3 class="popup__title">Обновить аватар</h3>
  <form class="popup__form" name="update-avatar" novalidate>      
      <input type="url" name="avatar" class="popup__input popup__input_type_link-url" required placeholder="Ссылка на аватар"><span class="error"></span>
      <button type="submit" class="button popup__button popup__button_type_update-avatar" disabled>Сохранить</button>
  </form>  
  `;

  constructor(container, avatar, createFormValidator, api) {

    super();
    this.container = container;
    this.avatarImage = avatar;
    this.createFormValidator = createFormValidator;
    this._api = api;
    this.form = null;
    this._open = this._open.bind(this);

  }

  _getTemplate = () => {

    const template = document.createElement('div');
    template.insertAdjacentHTML('afterbegin', UpdateAvatarPopup._markupUpdateAvatarPopup);
    return template.children

  }

  _renderContent = (container) => {

    Array.from(this._getTemplate()).forEach(node => container.appendChild(node));
    this.form = container.querySelector('.popup__form');

    const api = this._api;

    this.createFormValidator({ container, api })._setEventListeners();
    this._setEventListeners();

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

    const avatarData = {};
    inputs.forEach(input => {
      avatarData[`${input.getAttribute('name')}`] = input.value
    })

    button.textContent = 'Загрузка...';
    this._disableButton(button);

    this._api.updateAvatar(avatarData)
      .then(res => {

        this.avatarImage.style.backgroundImage = `url('${res.avatar}')`;
        this._close();

      })
      .catch(err => {
        console.log(err);
      })
  }

  _setEventListeners = (avatar) => {

    super.setEventListeners();
    this.form.addEventListener('submit', this._submitHandler);

  }
}