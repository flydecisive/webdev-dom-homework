import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments, login, register } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import {
  initButtonEventListener,
  initInputEventListener,
  initEnterEventListener,
} from "./modules/events.js";
import { createLoginForm } from "./modules/createLoginForm.js";
import { token, user } from "./consts.js";
import {
  initLoginButtonEventListener,
  initToRegisterButtonEventListener,
} from "./modules/events.js";

// Если есть токен то показывать главную страницу, если нет, то показывать страницу аториззации

let comments;
// let token;

renderApp();

export function renderApp() {
  const rootEl = document.querySelector(".container");

  if (token) {
    rootEl.innerHTML = renderMainPage(comments);
    getComments(token)
      .then((responseData) => {
        renderComments(responseData.comments);
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      })
      .finally(() => {
        const addFormName = document.querySelector(".add-form-name");
        addFormName.value = user;
        addFormName.setAttribute("disabled", true);
        initButtonEventListener();
        initInputEventListener();
        initEnterEventListener();
      });
  } else {
    rootEl.innerHTML = createLoginForm();
    initLoginButtonEventListener();
    initToRegisterButtonEventListener(rootEl);
  }
}
