import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments, login } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import {
  initButtonEventListener,
  initInputEventListener,
  initEnterEventListener,
} from "./modules/events.js";
import { createLoginForm } from "./modules/createLoginForm.js";

// Если есть токен то показывать главную страницу, если нет, то показывать страницу аториззации

let comments;
let user;
let token;

renderApp();

function renderApp() {
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
        initButtonEventListener(token);
        initInputEventListener();
        initEnterEventListener(token);
      });
  } else {
    rootEl.innerHTML = createLoginForm();
    initLoginButtonEventListener();
  }
}

function initLoginButtonEventListener() {
  const button = document.querySelector(".login-form-button-login");

  button.addEventListener("click", () => userLogin());
}

function userLogin() {
  const loginFormEl = document.querySelector(".login-form");
  const loginEl = document.querySelector(".login-form-login");
  const passwordEl = document.querySelector(".login-form-password");
  let message = document.querySelector(".error-message");

  if (!message) {
    message = document.createElement("p");
    message.classList.add("error-message");
  }

  if (loginEl.value.length === 0) {
    message.textContent = "Введите логин";
    loginFormEl.appendChild(message);
    return;
  }

  if (passwordEl.value.length === 0) {
    message.textContent = "Введите пароль";
    loginFormEl.appendChild(message);
    return;
  }

  if (loginEl.value.length < 3 || passwordEl.value.length < 3) {
    message.textContent =
      "Длина логина или пароля не должна быть меньше 3 символов";
    loginFormEl.appendChild(message);
    return;
  }

  login(loginEl.value, passwordEl.value)
    .catch((err) => {
      if (err.message === "Ошибка сервера") {
        message.textContent = "Неверный логин или пароль";
        loginFormEl.appendChild(message);
      }
    })
    .then((responseData) => {
      if (responseData) {
        user = responseData.user.login;
        token = responseData.user.token;
      }
    })
    .finally(() => {
      renderApp();
    });
}
