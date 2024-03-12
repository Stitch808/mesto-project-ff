const cardTemplate = document.querySelector("#card-template").content;

export function getCard(iteam, deletCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = iteam.name;
  cardImage.alt = iteam.name;
  cardImage.src = iteam.link;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deletCard(cardElement);
  });
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

// @todo: Функция удаления карточки
export function deletCard(iteam) {
  iteam.remove();
}

//лайк карточки
export function likeCard(evt) {
  const cardItemButton = evt.target.closest(".card__like-button");
  cardItemButton.classList.toggle("card__like-button_is-active");
}
