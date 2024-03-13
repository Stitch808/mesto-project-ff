import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { getCard, deletCard, likeCard } from "./scripts/card.js";
import { openPopup, close } from "./scripts/modal.js";

// @todo: Темплейт карточки
// @todo: DOM узлы

export const cardList = document.querySelector(".places__list");

function addCard(iteam) {
  cardList.append(iteam);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (iteam) {
  const cardData = getCard(iteam, deletCard, likeCard, openImagePopup);
  addCard(cardData);
});

const popupAdd = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
const formElementEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formElementNewPlace = document.querySelector(
  '.popup__form[name="new-place"]'
);
const popupInputTypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");

function defaultInputs() {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  close(popupEdit);
}
formElementEditProfile.addEventListener("submit", handleFormSubmit);

profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  defaultInputs();
});

//функция открытия картинки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
function openImagePopup(evt) {
  const cardImage = evt.target.closest(".card__image");
  openPopup(popupTypeImage);
  popupImage.src = cardImage.src;
  popupCaption.textContent = cardImage.alt;
  popupImage.alt = cardImage.alt
}

//Создание новой карточки
function createNewCard(evt) {
  evt.preventDefault();
  const cardInfo = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value,
  };
  const newCard = getCard(cardInfo, deletCard, likeCard, openImagePopup);

  cardList.prepend(newCard);
  formElementNewPlace.reset();
  close(popupTypeNewCard);
}

formElementNewPlace.addEventListener("submit", createNewCard);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});
