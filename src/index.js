import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, likeIsActive, createCard} from './components/card.js';
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
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
    const newCard = createCard(item, deleteCard, openCard, likeIsActive, elementTemplate); 
    elementList.append(newCard);
});

// Открытие окна - Редактирование информации в профиле
profileEditButton.addEventListener('click', function() {
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupTypeEdit);
});

// Открытие окна - Добавление новой карточки
addNewCardButton.addEventListener('click', function() {
     openPopup(popupTypeNewCard);
});

// Увеличение изображения карточки
function openCard(item) {
    const popupTypeImage = document.querySelector('.popup_type_image');
    const imagePopupTypeImage = popupTypeImage.querySelector('.popup__image');
    const textPopupTypeImage = popupTypeImage.querySelector('.popup__caption');
    imagePopupTypeImage.setAttribute('src', item.link);
    imagePopupTypeImage.setAttribute('alt', item.name);
    textPopupTypeImage.textContent = item.name;
    openPopup(popupTypeImage);
}

// Сохранение данных при редактировании информации в профиле
formElement.addEventListener('submit', handleProfileFormSubmit);

// Сохранение данных при добавлении карточки
formElementNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Редактирование информации в профиле
 function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
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
    const newCardElement = createCard(newCard, deleteCard, openCard, likeIsActive, elementTemplate); 
    elementList.prepend(newCardElement);
    cardNameInput.value = '';
    linkImageInput.value = '';
    closePopup(popupTypeNewCard);
}

    // Закрыть модальное окно на крестик
    popupCloseButtons.forEach((button) => {
        button.addEventListener('click', () => {
        const popupOpened = button.closest('.popup_is-opened');
        closePopup(popupOpened);
        });
    });

    // Закрыть модальное окно на оверлэй
    popups.forEach((overlay) => {
        overlay.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            const popupOpened = overlay.closest('.popup_is-opened');
            closePopup(popupOpened);
        }
        });
    });