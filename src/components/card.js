// @todo: Функция удаления карточки
export function deleteCard(event, cardId) {
    const card = event.target.closest('.places__item');

    const removeCard = () => {
        return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-20/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: 'df920228-ceba-4505-8d93-fdb1716d6967'
          },
        })
          .then((res) => {
          if (res.ok) {
            return res.json();
          }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
          })
          .then((result) => {
            console.log('Карточка успешно удалена ', result);
            card.remove();
          })
          .catch((err) => {
            console.log('Ошибка: ', err); 
          });
    }

    removeCard();
};

// Функция - обработчика лайка
export function likeCard(event, cardId) {
    if (!event.target.classList.contains('card__like-button_is-active')) {
        const putLikeCard = () => {
            return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-20/cards/likes/${cardId}`, {
              method: 'PUT',
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
              .then((result) => {
                console.log('Лайк успешно поставлен', result);
                event.target.classList.add('card__like-button_is-active');
                const likeZone = event.target.closest('.like-zone');
                const cardCountLike = likeZone.querySelector('.card__count-like')
                cardCountLike.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log('Ошибка: ', err); 
              });
          }
          putLikeCard();
    } else {
        const deleteLikeCard = () => {
            return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-20/cards/likes/${cardId}`, {
              method: 'DELETE',
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
              .then((result) => {
                console.log('Лайк успешно удален', result);
                event.target.classList.remove('card__like-button_is-active');
                const likeZone = event.target.closest('.like-zone');
                const cardCountLike = likeZone.querySelector('.card__count-like')
                cardCountLike.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log('Ошибка: ', err); 
              });
          }
          deleteLikeCard();
    }
}

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openCard, likeCard, elementTemplate, userId) {
    const elementCopy = elementTemplate.querySelector('.places__item').cloneNode(true);
    const templateTitle  = elementCopy.querySelector('.card__title');
    const templateImg  = elementCopy.querySelector('.card__image');
    const cardCountLike = elementCopy.querySelector('.card__count-like');
    templateTitle.textContent = item.name;
    templateImg.setAttribute('src', item.link);
    templateImg.setAttribute('alt', item.name);

    // Вывод количества лайков карточки
    cardCountLike.textContent = item.likes.length;

    const deleteButton = elementCopy.querySelector('.card__delete-button');
    const cardId = item._id;
    deleteButton.addEventListener('click', (event) => deleteCard(event, cardId));

    // Убрать иконку удаления карточки, если она создана другим пользователем
        if (userId != item.owner._id) {
        deleteButton.remove();
        }

    // Проверить, лайкал ли уже карточку
    const likeButton = elementCopy.querySelector('.card__like-button');
    if (item.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', (event) => likeCard(event, cardId));

    templateImg.addEventListener('click', () => {
        openCard(item);
    });
    return elementCopy;
};