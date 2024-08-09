import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, likeCard, createCard} from './components/card.js';
import {closePopup, openPopup} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserData, getCards, patchUserData, addNewCard, patchAvatar} from './components/api.js';


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
const popupForm = document.querySelector('.popup__form');
const popupInput = popupForm.querySelector('.popup__input');
const profileImage = document.querySelector('.profile__image');
const popupTypePatch= document.querySelector('.popup_type_patch');
const formElementPatchAvatar = popupTypePatch.querySelector('.popup__form');
const avatarInput = formElementPatchAvatar.querySelector('.popup__input_type_avatar');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Используем Promise.all для выполнения двух запросов
const promises = [getUserData(), getCards()];
Promise.all(promises)
.then((results) => {
  console.log(results);

  // Вывод информации о пользователе
  profileTitle.textContent = results[0].name;
  profileDescription.textContent = results[0].about;
  profileImage.style.backgroundImage = `url(${results[0].avatar})`;
  const userId = results[0]._id;

  // Вывод карточек на страницу
  results[1].forEach((item) => {
    const newCard = createCard(item, deleteCard, openCard, likeCard, elementTemplate, userId); 
    elementList.append(newCard);
  });
})
.catch((err) => {
  console.log('Ошибка: ', err); 
});

// Открытие окна - Редактирование информации в профиле
profileEditButton.addEventListener('click', function() {
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent;
    clearValidation(popupTypeEdit, validationConfig);
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
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  patchUserData(nameValue, jobValue)
    .then((result) => {
      console.log('Информация в профиле успешно отредактирована ', result);
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
    })
    .catch((err) => {
      console.log('Ошибка: ', err); 
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
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
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';
    addNewCard(cardNameValue, linkImageValue)
      .then((result) => {
        console.log('Новая карточка успешно добавлена ', result);
        const userId = result.owner._id;
        const newCardElement = createCard(result, deleteCard, openCard, likeCard, elementTemplate, userId); 
        elementList.prepend(newCardElement);
      })
      .catch((err) => {
        console.log('Ошибка: ', err); 
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить';
      });
    formElementNewCard.reset();
    clearValidation(popupTypeNewCard, validationConfig);
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

// Открытие окна - Обновление аватара пользователя
profileImage.addEventListener('click', () => openPopup(popupTypePatch));

// Сохранение данных при обновлении аватара пользователя
formElementPatchAvatar.addEventListener('submit', handlePatchAvatarFormSubmit);

// Обновление аватара пользователя
function handlePatchAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarValue = avatarInput.value;
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  patchAvatar(avatarValue)
    .then((result) => {
      console.log('Аватар пользователя успешно обновлен ', result);
      profileImage.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
      console.log('Ошибка: ', err); 
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
  avatarInput.value = '';
  clearValidation(popupTypePatch, validationConfig);
  closePopup(popupTypePatch);
}

// Вызовем функцию, отвечающую за валидацию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}); 