const config = {

  getUserInfo: {
    url: 'https://praktikum.tk/cohort11/users/me',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },
  },
  
  updateUserInfo: {
    url: 'https://praktikum.tk/cohort11/users/me',
    method: 'PATCH',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json'
    },
  },

  cardList: {
    url: 'https://praktikum.tk/cohort11/cards',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },    
  },

  addNewCard: {

    url: 'https://praktikum.tk/cohort11/cards',
    method: 'POST',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json',
    },
  }, 

  deleteCard: {

    url: 'https://praktikum.tk/cohort11/cards',
    method: 'DELETE',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },  

  }, 

  putLike: {

    url: 'https://praktikum.tk/cohort11/cards/like',
    method: 'PUT',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },

  },

  deleteLike: {

    url: 'https://praktikum.tk/cohort11/cards/like',
    method: 'DELETE',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },

  },

  updateAvatar: {

    url: 'https://praktikum.tk/cohort11/users/me/avatar',
    method: 'PATCH',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json',
    },

  },

};