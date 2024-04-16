const cardTemplate = document.querySelector("#card-template").content;

export function getCard(cardData, deletCard, openImagePopup) {
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
  deleteButton.addEventListener("click", function () {
    deletCard(cardElement);
  });
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    likeHandlers(likeCounter, cardLikeButton, userId)
  });
  cardImage.addEventListener("click", openImagePopup);
  
  return cardElement;
}

// @todo: Функция удаления карточки
export function deletCard(cardData) {
  cardData.remove();
}

//лайк карточки
export function likeCard(evt) {
  const cardItemButton = evt.target.closest(".card__like-button");
  cardItemButton.classList.toggle("card__like-button_is-active");
}

const likeHandlers = function (likeCounter, cardLikeButton, userId) {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    removeLike(userId)
  }
}
