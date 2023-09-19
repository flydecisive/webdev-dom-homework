import { createComment } from "./createComment.js";
import { createRegisterForm } from "./createRegisterForm.js";
import { registerUser } from "./registerUser.js";
import { userLogin } from "./loginUser.js";
import { createLoginForm } from "./createLoginForm.js";
import { setToken, setUser } from "../consts.js";
import { renderApp } from "../script.js";
import { toggleLike } from "../helpers.js";

export function initExitButtonEventListener() {
  const button = document.querySelector(".exit-button");

  button.addEventListener("click", () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    renderApp();
  });
}

// добавление обработчика события для лайка
export const initLikesEventListeners = (comments) => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (e) => {
      toggleLike(e, comments);
    });
  });
};

export function initButtonEventListener() {
  const button = document.querySelector(".add-form-button");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");

  button.addEventListener("click", () => {
    createComment(formNameElement, formTextElement);
  });
}

export function initInputEventListener() {
  const formElement = document.querySelector(".add-form");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");
  const button = document.querySelector(".add-form-button");

  formElement.addEventListener("input", () => {
    if (
      (formTextElement.value !== "" && !formTextElement.value.match(/^\s*$/)) ||
      formNameElement.value !== ""
    ) {
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
    }
  });
}

export function initEnterEventListener() {
  const formElement = document.querySelector(".add-form");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");

  formElement.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      createComment(formNameElement, formTextElement, event);
    }
  });
}

export function initLoginButtonEventListener() {
  const button = document.querySelector(".login-form-button-login");

  button.addEventListener("click", () => userLogin());
}

export function initToRegisterButtonEventListener(rootEl) {
  const button = document.querySelector(".login-form-button-register");

  button.addEventListener("click", () => {
    rootEl.innerHTML = createRegisterForm();
    initRegisterUserButtonEventListener(rootEl);
  });
}

export function initRegisterUserButtonEventListener(rootEl) {
  const registerButton = document.querySelector(
    ".register-form-button-register"
  );
  const loginButton = document.querySelector(".register-form-button-login");

  registerButton.addEventListener("click", () => {
    registerUser();
  });

  loginButton.addEventListener("click", () => {
    rootEl.innerHTML = createLoginForm();
    initLoginButtonEventListener();
    initToRegisterButtonEventListener(rootEl);
  });
}
