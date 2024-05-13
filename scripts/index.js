// @todo: Темплейт карточки
const elementTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const elementList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCard) {
    const elementCopy = elementTemplate.querySelector('.places__item').cloneNode(true);
    const templateTitle  = elementCopy.querySelector('.card__title');
    const templateImg  = elementCopy.querySelector('.card__image');
    templateTitle.textContent = name;
    templateImg.setAttribute('src', link);
    templateImg.setAttribute('alt', name);
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
    const newCard = createCard(item.name, item.link, deleteCard); 
    elementList.append(newCard);
});




 

