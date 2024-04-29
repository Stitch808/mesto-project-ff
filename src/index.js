import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { getCard, cardRemove, likeCard, likeHandlers } from "./scripts/card.js";
import { openPopup, close } from "./scripts/modal.js";
import {clearValidation, enableValidation} from "./scripts/validation.js"
import {getInitialCards, getInitialUser, editProfile, postNewCard, editAvatar} from "./scripts/api.js"


// @todo: Темплейт карточки
// @todo: DOM узлы

export const cardList = document.querySelector(".places__list");



let profileId = '';

// @todo: Вывести карточки на страницу
const renderCard = (cardInfo, method = "prepend") => {
  const cardElement = getCard(cardInfo, cardRemove, openImagePopup, profileId)
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
const profileImage = document.querySelector(".profile__image");
const formElementNewProfileImage = document.querySelector('.popup__form[name="new-profile_image"]')
const popupNewProfileImage = document.querySelector(".popup__new_profile_image");
const popupInputTypeAvatar = document.querySelector(".popup__input_type_avatar")

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
  setProfileAvatar(profileData)
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  function makeRequest(){
    return editProfile(popupInputTypeName.value, popupInputTypeDescription.value).then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      close(popupEdit);
    })
  }
  handleSubmit(makeRequest, evt) 
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
  function makeRequest(){
    return postNewCard(cardInfo.name, cardInfo.link).then((card) => {
      renderCard(card);
      close(popupTypeNewCard);
    }) 
  }
  handleSubmit(makeRequest, evt)
}

formElementNewPlace.addEventListener("submit", createNewCard);

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
  clearValidation(formElementNewPlace, validationConfig)
});

//редачим аву
const setProfileAvatar = (profileData) => {
  profileImage.setAttribute('style', `background-image: url('${profileData.avatar}');`)
}

function createNewProfileImage(evt) {
  evt.preventDefault();
  const cardInfo = {
    link: popupInputTypeAvatar.value,
  };
  function makeRequest() {
    return editAvatar(cardInfo.link).then((avatarUrl) => {
      setProfileAvatar(avatarUrl)
      close(popupNewProfileImage);
    }) 
  }
  handleSubmit(makeRequest, evt)
}
formElementNewProfileImage.addEventListener("submit", createNewProfileImage);

profileImage.addEventListener("click", function () {
  openPopup(popupNewProfileImage);
  clearValidation(formElementNewProfileImage, validationConfig)
});



enableValidation(validationConfig)

  //Хочу дать небольшую подсказку, частенько с этим заданием бывают сложности. 
  //В ПР7 есть задание сделать модалку, которая подтверждает удаление карточки по клику на кнопку. 
  //По сути это обычная форма с кнопкой, по сабмиту которой вы должны сделать запрос и в случае успеха удалить карточку из DOM. 
  //Обычно сложности с тем, а как же понять по какой карточке кликнули, т.е. как получить/передать айди в эту функцию сабмит. 
  //Тут есть два варианта: 1. Создать в глобальной области index переменную через let, например idCardForDelete и в нее перед открытием окна класть 
  //айдишник карточки, а потом ее использовать в функции сабмите. 2. Менять саму функцию сабмита. То есть создать такую же переменную через let в index, 
  //например handleSubmitConfirmPopup, повесить ее как сабмит на форму и уже перед открытием присваивать ей функцию, которую хотим выполнить. И в ней 
  //уже будет доступ к айдишнику карточке, так как описываем мы функцию удаления при создании карточки, как параметр в createCard, 
  //соответсвенно можем получить как и имя и ссылку Оба метода рабочие, первый чуть легче. При этом способе модалка может только подтвердить удаление карточки. 
  //Второй более универсальный. 

function renderLoading(isLoading, element, defaultStatus='Сохранить', loadingStatus='Сохранение...') {
  if(isLoading) {
    element.textContent = loadingStatus
  }
  else {
    element.textContent = defaultStatus
  }
}

function handleSubmit(request, evt, loadingText='Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter
  const defaultStatus = submitButton.textContent

  renderLoading(true, submitButton, defaultStatus, loadingText)
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading(false, submitButton, defaultStatus, loadingText);
    });
}

Promise.all ([getInitialCards(), getInitialUser()])
.then (([cards, user]) => {
  setProfileInfo(user);
  setProfileAvatar(user);
  cards.forEach((cardData) => { 
    renderCard(cardData, 'append')
  });
})
.catch ((err) => {
  console.log(err)
})