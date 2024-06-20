// @todo: Закрыть модальное окно
export function closePopup(popupName) {
    popupName.classList.remove('popup_is-opened');
    popupName.classList.add('popup_is-animated');
}

// Закрыть модальное окно на Esc
function closePopupOnEsc(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
        document.removeEventListener('keydown', closePopupOnEsc);
    }
}

// @todo: Открыть модальное окно
export function openPopup(popupName) {
    popupName.classList.remove('popup_is-animated');
    popupName.classList.add('popup_is-opened');
    // Закрыть модальное окно на крестик
    const popupCloseButton = popupName.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => {
        closePopup(popupName);
    });
    // Закрыть модальное окно на оверлэй
    popupName.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closePopup(popupName);
        }
    });
    // Закрыть модальное окно на Esc
    document.addEventListener('keydown', closePopupOnEsc);
}

