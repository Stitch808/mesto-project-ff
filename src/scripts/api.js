// API
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: 'de52b97b-8cdb-4a17-8dd9-b1762867c87f',
    'Content-Type': 'application/json',
  }
}

//проверяем всё ли в порядке с ответом
const handleResponse = (res) => {
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

const editAvatar = (url) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
  
    body: JSON.stringify({
      avatar: `${url}`
    })
  }); 

}

export {handleResponse, request, getInitialCards, getInitialUser, editProfile, postNewCard, deleteCard, addLike, removeLike, editAvatar}