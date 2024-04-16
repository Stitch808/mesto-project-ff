import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { getCard, deletCard, likeCard } from "./scripts/card.js";
import { openPopup, close } from "./scripts/modal.js";
import {clearValidation, enableValidation} from "./scripts/validation.js"



// @todo: Темплейт карточки
// @todo: DOM узлы

export const cardList = document.querySelector(".places__list");



let profileId = '';

// @todo: Вывести карточки на страницу
const renderCard = (cardInfo, method = "prepend") => {
  const cardElement = getCard(cardInfo, deletCard, likeCard, openImagePopup, profileId)
  cardList[ method ](cardElement)
}

const popupEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeDescription = document.querySelector(".popup__input_type_description");
const formElementEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formElementNewPlace = document.querySelector('.popup__form[name="new-place"]');
const popupInputTypeCardName = document.querySelector(".popup__input_type_card-name");
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");

//классы для привязки
export const validationConfig = { 
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function defaultInputs() {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
}

const setProfileInfo = (profileData) => {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
  profileId = profileData._id;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
    return editProfile(popupInputTypeName.value, popupInputTypeDescription.value).then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      close(popupEdit);
    })
  }
  
formElementEditProfile.addEventListener("submit", handleFormSubmit);

profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  defaultInputs();
  clearValidation(formElementEditProfile, validationConfig)
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

  return postNewCard(cardInfo.name, cardInfo.link).then((card) => {
    renderCard(card);
    close(popupTypeNewCard);
  }) 
}

enableValidation(validationConfig)

formElementNewPlace.addEventListener("submit", createNewCard);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
  clearValidation(formElementNewPlace, validationConfig)
});

//считаем лайки


// API

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'de52b97b-8cdb-4a17-8dd9-b1762867c87f',
    'Content-Type': 'application/json',
  }
}



//проверяем всё ли в порядке с ответом
export const handleResponse = (res) => {
    if (res.ok) {
      return res.json(); 
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };

//функция под любой запрос
const request = (endpoint, options) => {
  const completeUrl = config.baseUrl + endpoint;
  return fetch(completeUrl, options).then(handleResponse)
}


//Загрузка карточек с сервера
const getInitialCards = () => {
  return request('/cards', {
    headers: config.headers
  });
}


//Загрузка информации о пользователе с сервера
const getInitialUser = () => {
  return request('/users/me', {
    headers: config.headers
  });
}

  
//Редактирование профиля
const editProfile = (newName, newDescription) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
  
    body: JSON.stringify({
      name: `${newName}`,
      about: `${newDescription}`
    })
  }); 
}


//Создание новой карточки 
const postNewCard = (nameCard, url) => {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
  
    body: JSON.stringify({
      name: `${nameCard}`,
      link: `${url}`
    })
  }); 
}

const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

const addLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }); 
}

const removeLike = (cardId) => {
  return request(`/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }); 
}

Promise.all ([getInitialCards(), getInitialUser()])
.then (([cards, user]) => {
  setProfileInfo(user);
  cards.forEach((cardData) => { 
    renderCard(cardData, 'append')
  });
})
.catch ((err) => {
  console.log(err)
})