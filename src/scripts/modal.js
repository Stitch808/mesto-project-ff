// Работу модальных окон
export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeByClick);
  document.addEventListener("keydown", closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    close(popup);
  }
}

function closeByClick(evt) {
  const closeButton = evt.currentTarget.querySelector(".popup__close");
  if (evt.target === evt.currentTarget || evt.target === closeButton) {
    close(evt.currentTarget);
  }
}

export function close(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeByClick);
  popup.removeEventListener("click", closeByClick);
}
