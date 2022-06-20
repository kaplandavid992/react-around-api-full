
//custom hooks for validation??

// export default class FormValidator {
//     constructor(settings, formElement) {
//       this._inputSelector = settings.inputSelector;
//       this._submitButtonSelector = settings.submitButtonSelector;
//       this._inactiveButtonClass = settings.inactiveButtonClass;
//       this._inputErrorClass = settings.inputErrorClass;
//       this._errorClass = settings.errorClass;
//       this._formElement = formElement;
//       this._inputList = Array.from(
//         this._formElement.querySelectorAll(this._inputSelector)
//       );
//       this._buttonElement = this._formElement.querySelector(
//         this._submitButtonSelector
//       );
//     }
  
//     _showInputError(inputElement, errorMessage) {
//       const errorElement = this._formElement.querySelector(
//         `#${inputElement.id}-error`
//       );
//       errorElement.textContent = errorMessage;
//       errorElement.classList.add(this._errorClass);
//     }
  
//     _hideInputError(inputElement) {
//       const errorElement = this._formElement.querySelector(
//         `#${inputElement.id}-error`
//       );
//       errorElement.classList.remove(this._errorClass);
//       errorElement.textContent = "";
//     }
  
//     _checkInputValidity(inputElement) {
//       if (!inputElement.validity.valid) {
//         this._showInputError(inputElement, inputElement.validationMessage);
//       } else {
//         this._hideInputError(inputElement);
//       }
//     }
  
//     _hasInvalidInput = (inputList) => {
//       return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//       });
//     };
  
//     _toggleButtonState = () => {
//       if (this._hasInvalidInput(this._inputList)) {
//         this._buttonElement.classList.add(this._inactiveButtonClass);
//         this._buttonElement.setAttribute("disabled", true);
//         this._buttonElement.setAttribute("style", "cursor:not-allowed");
//       } else {
//         this._buttonElement.classList.remove(this._inactiveButtonClass);
//         this._buttonElement.removeAttribute("disabled");
//         this._buttonElement.setAttribute("style", "cursor: pointer");
//       }
//     };
  
//     _setInputsEventListeners() {
//       this._inputList.forEach((inputElement) => {
//         inputElement.addEventListener("input", () => {
//           this._checkInputValidity(inputElement);
//           this._toggleButtonState();
//         });
//       });
//     }
  
//     resetValidation() {
//       this._inputList.forEach((inputElement) => {
//         this._hideInputError(inputElement);
//       });
//       this._toggleButtonState();
//     }
  
//     enableValidation() {
//       this._formElement.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//       });
//       this._setInputsEventListeners();
//     }
//   }



// some of index.js...
// const formValidators = {};
// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     const validator = new FormValidator(settings, formElement);
//     const formName = formElement.getAttribute("name");
//     formValidators[formName] = validator;
//     validator.enableValidation();
//   });
// };

// enableValidation(settings);
// editPopup.setEventListeners();
// addPopup.setEventListeners();
// editProfileImgPopup.setEventListeners();
// confirmDeletePopUp.setEventListeners();
// imagePopup.setEventListeners();


// profileEditBtn.addEventListener("click", () => {
//     formValidators["edit__form"].resetValidation();
//     const userData = profileUserInfo.getUserInfo();
//     inputName.setAttribute("value", userData.name);
//     inputRole.setAttribute("value", userData.role);
//     editPopup.open();
//   });
  
//   profileAddBtn.addEventListener("click", () => {
//     formValidators["add__form"].resetValidation();
//     addPopup.open();
//   });
  
//   editProfileImage.addEventListener("click", () => {
//     formValidators["editProfileImage__form"].resetValidation();
//     editProfileImgPopup.open();
//   });