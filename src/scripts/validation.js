import { validationConfig } from "../index.js";
//Валидация
const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  //проверка полей на валидность
  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  //делаем кнопку неактивной 
  const toggleButtonState = function (inputList, submitButtonSelector) {
    if (hasInvalidInput(inputList)) {
      submitButtonSelector.disabled = true;
      submitButtonSelector.classList.add(validationConfig.inactiveButtonClass)
    }
    else {
      submitButtonSelector.disabled = false;
      submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass)
    }
  }
    
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        
        toggleButtonState(inputList, buttonElement, validationConfig)
      });
    });
  };
  
  const hasInvalidInput = function (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  };
  
  //очистка ошибок
  const clearValidation = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
        
      toggleButtonState(inputList, buttonElement, validationConfig)
      });
  };
  
  //отправка формы
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, validationConfig);
    });
  };
  
  export {clearValidation, enableValidation}