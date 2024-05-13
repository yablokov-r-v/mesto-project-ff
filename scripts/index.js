// @todo: Темплейт карточки
const elementTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const elementList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
    const elementCopy = elementTemplate.querySelector('.places__item').cloneNode(true);
    const templateTitle  = elementCopy.querySelector('.card__title');
    const templateImg  = elementCopy.querySelector('.card__image');
    templateTitle.textContent = item.name;
    templateImg.setAttribute('src', item.link);
    templateImg.setAttribute('alt', item.name);
    const deleteButton = elementCopy.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return elementCopy;
};

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard); 
    elementList.append(newCard);
});




 

