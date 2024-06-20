// @todo: Функция удаления карточки
export function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// Функция - обработчика лайка
export function likeIsActive(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

// Увеличение изображения карточки
export function openCard(item, openPopup) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const imagePopupTypeImage = popupTypeImage.querySelector('.popup__image');
    const textPopupTypeImage = popupTypeImage.querySelector('.popup__caption');
    imagePopupTypeImage.setAttribute('src', item.link);
    imagePopupTypeImage.setAttribute('alt', item.name);
    textPopupTypeImage.textContent = item.name;
    openPopup(popupTypeImage);
}

// @todo: Функция создания карточки
export function createCard(item, deleteCard, openCard, likeIsActive, elementTemplate, openPopup) {
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
        openCard(item, openPopup);
    });
    return elementCopy;
};