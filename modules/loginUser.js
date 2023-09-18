// Обработка страницы входа
import { renderApp } from "../script.js";
import { setToken, setUser } from "../consts.js";
import { login } from "./api.js";

export function userLogin() {
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
        // message.textContent = "Неверный логин или пароль";
        // loginFormEl.appendChild(message);
        alert("Неверный логин или пароль");
      }
    })
    .then((responseData) => {
      if (responseData) {
        setToken(responseData.user.token);
        // user = responseData.user.name;
        setUser(responseData.user.name);
      }
    })
    .finally(() => {
      renderApp();
    });
}
