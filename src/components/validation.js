// Функция, которая добавляет класс с ошибкой
const showInputError = (popupForm, popupInput, errorMessage, config) => {
    // Находим элемент ошибки внутри самой функции
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(config.inputErrorClass);
    popupError.textContent = errorMessage;
    // Показываем сообщение об ошибке
    popupError.classList.add(config.errorClass);
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupForm, popupInput, config) => {
    // Находим элемент ошибки
    const popupError = popupForm.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(config.inputErrorClass);
    // Скрываем сообщение об ошибке
    popupError.classList.remove(config.errorClass);
     // Очистим ошибку
    popupError.textContent = '';
};
  
// Функция, которая проверяет валидность поля
const isValid = (popupForm, popupInput, config) => {
    if (popupInput.validity.patternMismatch) {
      popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
      popupInput.setCustomValidity("");
    }
    if (!popupInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(popupForm, popupInput, popupInput.validationMessage, config);
    } else {
      // Если проходит, скроем
      hideInputError(popupForm, popupInput, config);
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

// Если есть хотя бы один невалидный инпут
// сделай кнопку неактивной
// иначе сделай кнопку активной
const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};
const enableSubmitButton = (button, config) => {
  button.disabled = false;
  button.classList.remove(config.inactiveButtonClass);
};
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};
  
const setEventListeners = (popupForm, config) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = popupForm.querySelector(config.submitButtonSelector);
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement, config);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((popupInput) => {
      // каждому полю добавим обработчик события input
      popupInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(popupForm, popupInput, config)
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }; 

export const enableValidation = (config) => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // Переберём полученную коллекцию
    formList.forEach((popupForm) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(popupForm, config);
    });
  };

// очистка ошибок валидации
export const clearValidation = (popup, config) => {
    const popupForm = popup.querySelector(config.formSelector);
    const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
    const buttonElement = popupForm.querySelector(config.submitButtonSelector);
    disableSubmitButton(buttonElement, config);
    inputList.forEach((popupInput) => {
      hideInputError(popupForm, popupInput, config);
    });
 };