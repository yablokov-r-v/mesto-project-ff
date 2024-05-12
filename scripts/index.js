// @todo: Темплейт карточки
let elementTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
let elementList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, callback) {
    const elementCopy = elementTemplate.querySelector('.places__item').cloneNode(true);
    const templateTitle  = elementCopy.querySelector('.card__title');
    const templateImg  = elementCopy.querySelector('.card__image');
    templateTitle.textContent = name;
    templateImg.setAttribute('src', link);
    elementList.append(elementCopy);
    const deleteButton = elementCopy.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', callback);
};

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    createCard(item.name, item.link, deleteCard); 
});




 

