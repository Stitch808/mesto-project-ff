(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{G:()=>D});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-9",headers:{authorization:"de52b97b-8cdb-4a17-8dd9-b1762867c87f","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},r=function(e,r){return fetch(t.baseUrl+e,r).then(n)},o=document.querySelector("#card-template").content;function c(e,n){var o;(o=n,r("/cards/".concat(o),{method:"DELETE",headers:t.headers})).then((function(){e.remove()})).catch((function(e){console.log(e)}))}function a(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),e.addEventListener("click",u),document.addEventListener("keydown",i)}function i(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function u(e){var t=e.currentTarget.querySelector(".popup__close");e.target!==e.currentTarget&&e.target!==t||l(e.currentTarget)}function l(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",u),document.removeEventListener("keydown",i)}var s=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(D.inputErrorClass),n.classList.remove(D.errorClass),n.textContent=""},d=function(e,t){p(e)?(t.disabled=!0,t.classList.add(D.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(D.inactiveButtonClass))},p=function(e){return e.some((function(e){return!e.validity.valid}))},_=function(e){var t=Array.from(e.querySelectorAll(D.inputSelector)),n=e.querySelector(D.submitButtonSelector);d(t,n),t.forEach((function(r){s(e,r),d(t,n)}))};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".places__list"),v="",y=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prepend",a=function(e,n,a,i){var u=o.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__image"),s=u.querySelector(".card__title"),d=u.querySelector(".card__like-counter"),p=e._id;s.textContent=e.name,l.alt=e.name,l.src=e.link,d.textContent=e.likes.length;var _=u.querySelector(".card__delete-button");i===e.owner._id?(_.classList.add("card__delete-button_is-active"),_.addEventListener("click",(function(){c(u,p)}))):_.remove();var f=e.likes.some((function(e){return e._id===i})),m=u.querySelector(".card__like-button");return m.addEventListener("click",(function(){!function(e,n,o){var c;n.classList.contains("card__like-button_is-active")?(c=o,r("/cards/likes/".concat(c),{method:"DELETE",headers:t.headers})).then((function(t){n.classList.toggle("card__like-button_is-active"),e.textContent=t.likes.length})).catch((function(e){console.log(e)})):function(e){return r("/cards/likes/".concat(e),{method:"PUT",headers:t.headers})}(o).then((function(t){n.classList.toggle("card__like-button_is-active"),e.textContent=t.likes.length})).catch((function(e){console.log(e)}))}(d,m,p)})),l.addEventListener("click",a),f&&m.classList.add("card__like-button_is-active"),u}(e,0,U,v);m[n](a)},h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),g=document.querySelector(".popup_type_new-card"),q=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),L=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description"),E=document.querySelector('.popup__form[name="edit-profile"]'),x=(document.querySelector(".popup__input_type_name"),document.querySelector(".popup__input_type_description"),document.querySelector('.popup__form[name="new-place"]')),A=document.querySelector(".popup__input_type_card-name"),w=document.querySelector(".popup__input_type_url"),O=document.querySelector(".profile__image"),T=document.querySelector('.popup__form[name="new-profile_image"]'),j=document.querySelector(".popup__new_profile_image"),P=document.querySelector(".popup__input_type_avatar"),D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};E.addEventListener("submit",(function(e){e.preventDefault(),H((function(){return(e=L.value,n=C.value,r("/users/me",{method:"PATCH",headers:t.headers,body:JSON.stringify({name:"".concat(e),about:"".concat(n)})})).then((function(e){q.textContent=e.name,k.textContent=e.about,l(h)}));var e,n}),e)})),S.addEventListener("click",(function(){a(h),L.value=q.textContent,C.value=k.textContent,_(E)}));var B=document.querySelector(".popup_type_image"),M=document.querySelector(".popup__image"),N=document.querySelector(".popup__caption");function U(e){var t=e.target.closest(".card__image");a(B),M.src=t.src,N.textContent=t.alt,M.alt=t.alt}x.addEventListener("submit",(function(e){e.preventDefault();var n={name:A.value,link:w.value};H((function(){return(e=n.name,o=n.link,r("/cards",{method:"POST",headers:t.headers,body:JSON.stringify({name:"".concat(e),link:"".concat(o)})})).then((function(e){y(e),l(g)}));var e,o}),e)})),b.addEventListener("click",(function(){a(g),_(x)}));var I=function(e){O.setAttribute("style","background-image: url('".concat(e.avatar,"');"))};function J(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function H(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;J(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error(e)})).finally((function(){J(!1,r,o,n)}))}T.addEventListener("submit",(function(e){e.preventDefault();var n={link:P.value};H((function(){return(e=n.link,r("/users/me/avatar",{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:"".concat(e)})})).then((function(e){I(e),l(j)}));var e}),e)})),O.addEventListener("click",(function(){a(j),_(T)})),Array.from(document.querySelectorAll(D.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(D.inputSelector)),n=e.querySelector(D.submitButtonSelector);d(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?s(e,t):function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(D.inputErrorClass),n.textContent=t.validationMessage,n.classList.add(D.errorClass)}(e,t,t.validationMessage)})(e,r),d(t,n)}))}))}(e)})),Promise.all([r("/cards",{headers:t.headers}),r("/users/me",{headers:t.headers})]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];t=a,q.textContent=t.name,k.textContent=t.about,v=t._id,I(t),I(a),c.forEach((function(e){y(e,"append")}))})).catch((function(e){console.log(e)}))})();