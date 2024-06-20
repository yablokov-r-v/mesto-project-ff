import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, openCard, likeIsActive, createCard} from './components/card.js';
import {closePopup, openPopup} from './components/modal.js';

// @todo: Темплейт карточки
const elementTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const elementList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit  = document.querySelector('.popup_type_edit'); 
const inputName = popupTypeEdit.querySelector('.popup__input_type_name'); 
const inputDescription = popupTypeEdit.querySelector('.popup__input_type_description'); 
const addNewCardButton = document.querySelector('.profile__add-button');
const popupTypeNewCard  = document.querySelector('.popup_type_new-card'); 
const formElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const formElementNewCard = popupTypeNewCard.querySelector('.popup__form');
const cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkImageInput = formElementNewCard.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard, openCard, likeIsActive, elementTemplate, openPopup); 
    elementList.append(newCard);
});

// Открытие окна - Редактирование информации в профиле
profileEditButton.addEventListener('click', function() {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
});

// Открытие окна - Добавление новой карточки
addNewCardButton.addEventListener('click', function() {
     openPopup(popupTypeNewCard);
});

// Сохранение данных при редактировании информации в профиле
formElement.addEventListener('submit', handleFormSubmit);

// Сохранение данных при добавлении карточки
formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Редактирование информации в профиле
 function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closePopup(popupTypeEdit);
}

// Добавление новой карточки в начало
 function handleFormNewCardSubmit(evt) {
    evt.preventDefault();
    const cardNameValue = cardNameInput.value;
    const linkImageValue = linkImageInput.value;
    const newCard = {
        name: cardNameValue,
        link: linkImageValue
    };
    const newCardElement = createCard(newCard, deleteCard, openCard, likeIsActive, elementTemplate, openPopup); 
    elementList.prepend(newCardElement);
    cardNameInput.value = '';
    linkImageInput.value = '';
    closePopup(popupTypeNewCard);
}