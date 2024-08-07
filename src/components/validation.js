// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupInput, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add('form__input_type_error');
    popupError.textContent = errorMessage;
    // Показываем сообщение об ошибке
    popupError.classList.add('form__input-error_active');
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupInput) => {
    // Находим элемент ошибки
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove('form__input_type_error');
    // Скрываем сообщение об ошибке
    popupError.classList.remove('form__input-error_active');
     // Очистим ошибку
    popupError.textContent = '';
};
  
// Функция, которая проверяет валидность поля
const isValid = (popupForm, popupInput) => {
    if (popupInput.validity.patternMismatch) {
      popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
      popupInput.setCustomValidity("");
    }
    if (!popupInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(popupForm, popupInput, popupInput.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupInput);
    }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !popupInput.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
  } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
  }
}; 
  
const setEventListeners = (popupForm) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = popupForm.querySelector('.popup__button');
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((popupInput) => {
      // каждому полю добавим обработчик события input
      popupInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(popupForm, popupInput)
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

export const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(popupForm);
    });
  };

// очистка ошибок валидации
export const clearValidation = (popup) => {
    const popupForm = popup.querySelector('.popup__form');
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    const buttonElement = popupForm.querySelector('.popup__button');
    buttonElement.disabled = true;
    buttonElement.classList.add('form__submit_inactive');
    inputList.forEach((popupInput) => {
        const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
        popupInput.classList.remove('form__input_type_error');
        popupError.classList.remove('form__input-error_active');
        popupError.textContent = '';
    });
 };