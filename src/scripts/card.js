import {deleteCard, addLike, removeLike} from "./api.js"


const cardTemplate = document.querySelector("#card-template").content;

export function getCard(cardData, deletCard, openImagePopup, profileId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-counter")
  const userId = cardData._id;

  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;

  likeCounter.textContent = cardData.likes.length

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (profileId === cardData.owner._id) {
    deleteButton.classList.add("card__delete-button_is-active")
    
    deleteButton.addEventListener("click", function () {
      cardRemove(cardElement, userId);
    });
  }
  else {
    deleteButton.remove()
  }

  const checkLike = cardData.likes.some ((like) => {
    return like._id === profileId
  })

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    likeHandlers(likeCounter, cardLikeButton, userId)
  });
  cardImage.addEventListener("click", openImagePopup);

  if (checkLike) {
    cardLikeButton.classList.add("card__like-button_is-active")
  }
  
  return cardElement;
}

// @todo: Функция удаления карточки
export function cardRemove(cardElement, id) {
  deleteCard(id)
  .then (() => {
    cardElement.remove()
  })
  .catch ((err) => {
    console.log(err)
  })
  
}

//лайк карточки
const likeHandlers = function (likeCounter, cardLikeButton, userId) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    removeLike(userId)
    .then ((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length
    })
    .catch ((err) => {
      console.log(err)
    })
  }
  else {
    addLike(userId)
    .then ((res) => {
      cardLikeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = res.likes.length
    })
    .catch ((err) => {
      console.log(err)
    })
  }
}
