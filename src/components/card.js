// @todo: Функция удаления карточки
export function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// Функция - обработчика лайка
export function likeIsActive(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openCard, likeIsActive, elementTemplate) {
    const elementCopy = elementTemplate.querySelector('.places__item').cloneNode(true);
    const templateTitle  = elementCopy.querySelector('.card__title');
    const templateImg  = elementCopy.querySelector('.card__image');
    templateTitle.textContent = item.name;
    templateImg.setAttribute('src', item.link);
    templateImg.setAttribute('alt', item.name);
    const deleteButton = elementCopy.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    const likeButton = elementCopy.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeIsActive);
    templateImg.addEventListener('click', () => {
        openCard(item);
    });
    return elementCopy;
};