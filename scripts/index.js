// @todo: Темплейт карточки
// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function getCard(iteam, deletCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	cardImage.src = iteam.link;
	cardImage.alt = iteam.name;
	cardTitle.textContent = iteam.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', function() {
    deletCard(cardElement)
  });

	return cardElement;

}

// @todo: Функция создания карточки
function addCard(cardData) {
	cardList.append(getCard(cardData, deletCard))
}

// @todo: Функция удаления карточки
function deletCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((function(element) {
	addCard(element)
}))
