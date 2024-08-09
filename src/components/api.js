const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'df920228-ceba-4505-8d93-fdb1716d6967',
    'Content-Type': 'application/json'
  }
}

// Функция для обработки ответа от сервера
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

// Запрос информации о пользователе с сервера
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

// Запрос карточек с сервера
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse);
};

// Запрос на удаление карточки
export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
}

// Запрос на постановку лайка
export const putLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse);
}

// Запрос на удаление лайка
export const deleteLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
}

//Запрос на редактирование информации в профиле
export const patchUserData = (nameValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue
    })
  })
  .then(handleResponse);
}

// Запрос на добавление новой карточки
export const addNewCard = (cardNameValue, linkImageValue) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameValue,
      link: linkImageValue
    })
  })
  .then(handleResponse);
}

// Запрос на обновление аватара пользователя
export const patchAvatar = (avatarValue) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarValue,
    })
  })
  .then(handleResponse);
}