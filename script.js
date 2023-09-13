// import { getComments } from "./modules/api.js";
// import { createComment } from "./modules/api.js";
// import { comments } from "./modules/comments.js";

// const button = document.querySelector(".add-form-button");
// const formElement = document.querySelector(".add-form");
// const formTextElement = formElement.querySelector(".add-form-text");
// const formNameElement = formElement.querySelector(".add-form-name");

// getComments(comments);

// formElement.addEventListener("keyup", (event) => {
//   if (event.code === "Enter") {
//     createComment(formNameElement, formTextElement, event);
//     getComments(comments);
//   }
// });

// formElement.addEventListener("input", () => {
//   if (
//     (formTextElement.value !== "" && !formTextElement.value.match(/^\s*$/)) ||
//     formNameElement.value !== ""
//   ) {
//     button.classList.remove("disabled");
//     button.removeAttribute("disabled");
//   }
// });

// button.addEventListener("click", () => {
//   createComment(formNameElement, formTextElement);
// });
import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import { renderForm } from "./modules/renderForm.js";

// Если есть токен то показывать главную страницу, если нет, то показывать страницу аториззации

let comments;

renderApp();

function renderApp() {
  const rootEl = document.querySelector(".container");
  rootEl.innerHTML = renderMainPage(comments);

  getComments().then((responseData) => {
    renderComments(responseData.comments);
  });
}
