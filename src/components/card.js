import {removeCard, putLikeCard, deleteLikeCard} from './api.js';

// @todo: Функция удаления карточки
export function deleteCard(event, cardId) {
  const card = event.target.closest('.places__item');
  removeCard(cardId)
    .then((result) => {
      console.log('Карточка успешно удалена ', result);
      card.remove();
    })
    .catch((err) => {
      console.log('Ошибка: ', err); 
    });
};

// Функция - обработчика лайка
export function likeCard(event, cardId) {
  const likeMethod = event.target.classList.contains('card__like-button_is-active') ? deleteLikeCard : putLikeCard;
  likeMethod(cardId)
    .then((result) => {
      console.log('Лайк успешно обработан', result);
      event.target.classList.toggle('card__like-button_is-active');
      const likeZone = event.target.closest('.like-zone');
      const cardCountLike = likeZone.querySelector('.card__count-like');
      cardCountLike.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
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

    // Убрать иконку удаления карточки, если она создана другим пользователем
    const deleteButton = elementCopy.querySelector('.card__delete-button');
    const cardId = item._id;
      if (userId != item.owner._id) {
        deleteButton.remove();
      }
      else {
        deleteButton.addEventListener('click', (event) => deleteCard(event, cardId));
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