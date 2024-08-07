// Запрос информации о пользователе с сервера
export const getUserData = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-20/users/me', {
      method: 'GET',
      headers: {
        authorization: 'df920228-ceba-4505-8d93-fdb1716d6967',
         'Content-Type': 'application/json'
      }
    })
      .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }

// Запрос карточек с сервера
export const getCards = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-20/cards', {
      method: 'GET',
      headers: {
        authorization: 'df920228-ceba-4505-8d93-fdb1716d6967',
         'Content-Type': 'application/json'
      }
    })
      .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
  }
