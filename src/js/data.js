const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';

export const config = {

  getUserInfo: {
    url: `${API_URL}/cohort11/users/me`,
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },
  },
  
  updateUserInfo: {
    url: `${API_URL}/cohort11/users/me`,
    method: 'PATCH',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json'
    },
  },

  cardList: {
    url: `${API_URL}/cohort11/cards`,
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },    
  },

  addNewCard: {

    url: `${API_URL}/cohort11/cards`,
    method: 'POST',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json',
    },
  }, 

  deleteCard: {

    url: `${API_URL}/cohort11/cards`,
    method: 'DELETE',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },  

  }, 

  putLike: {

    url: `${API_URL}/cohort11/cards/like`,
    method: 'PUT',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },

  },

  deleteLike: {

    url: `${API_URL}/cohort11/cards/like`,
    method: 'DELETE',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
    },

  },

  updateAvatar: {

    url: `${API_URL}/cohort11/users/me/avatar`,
    method: 'PATCH',
    headers: {
      authorization: '622caa06-e47a-463d-be1d-e472b804c40b',
      'Content-Type': 'application/json',
    },

  },

};