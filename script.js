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

  getComments()
    .then((responseData) => {
      renderComments(responseData.comments);
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    })
    .finally(() => {
      initButtonEventListener();
      initInputEventListener();
      initEnterEventListener();
    });
}

function initButtonEventListener() {
  const button = document.querySelector(".add-form-button");

  button.addEventListener("click", () => {
    // createComment(formNameElement, formTextElement);
    console.log("click submit");
  });
}

function initInputEventListener() {
  const formElement = document.querySelector(".add-form");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");
  const button = document.querySelector(".add-form-button");

  formElement.addEventListener("input", (event) => {
    console.log(event.target.value);
    if (
      (formTextElement.value !== "" && !formTextElement.value.match(/^\s*$/)) ||
      formNameElement.value !== ""
    ) {
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
    }
  });
}

function initEnterEventListener() {
  const formElement = document.querySelector(".add-form");

  formElement.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      // createComment(formNameElement, formTextElement, event);
      // getComments(comments);
      console.log("enter");
    }
  });
}
