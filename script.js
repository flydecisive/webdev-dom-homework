import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments, login, register } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import {
  initButtonEventListener,
  initInputEventListener,
  initEnterEventListener,
  initExitButtonEventListener,
} from "./modules/events.js";
import { createLoginForm } from "./modules/createLoginForm.js";
import { token, user, comments, setComments } from "./consts.js";
import {
  initLoginButtonEventListener,
  initToRegisterButtonEventListener,
} from "./modules/events.js";

// Если есть токен то показывать главную страницу, если нет, то показывать страницу аториззации

renderApp();

export function renderApp() {
  const rootEl = document.querySelector(".container");

  if (token) {
    rootEl.innerHTML = renderMainPage(comments);
    getComments(token)
      .then((responseData) => {
        setComments(comments);
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
        initExitButtonEventListener();
      });
  } else {
    rootEl.innerHTML = "";
    const comments = document.createElement("div");
    comments.classList.add("comments");
    rootEl.appendChild(comments);

    getComments(token)
      .then((responseData) => {
        setComments(comments);
        renderComments(responseData.comments);
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      })
      .finally(() => {
        const text = document.createElement("p");
        text.classList.add("warn");
        text.textContent =
          "Только авторизованные пользователи могут оставлять комментарии";
        rootEl.appendChild(text);

        const authButton = document.createElement("button");
        authButton.textContent = "Аторизоваться";
        authButton.classList.add("auth-button");
        rootEl.appendChild(authButton);

        authButton.addEventListener("click", () => {
          rootEl.innerHTML = createLoginForm();
          initLoginButtonEventListener();
          initToRegisterButtonEventListener(rootEl);
        });
      });
  }
}
