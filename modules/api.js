// import { renderComments } from "./renderComments.js";
// import { renderForm } from "./renderForm.js";

// const button = document.querySelector(".add-form-button");

const API_URL = "https://wedev-api.sky.pro/api/v2/m-m";
const AUTH_URL = "https://wedev-api.sky.pro/api/user";
// const token =
//   "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

// Получение комментариев
export const getComments = async (token) => {
  return fetch(`${API_URL}/comments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 500) {
      alert("Сервер сломался, попробуй позже");
    } else {
      return response.json();
    }
  });
};

// Добавление комментария
export const addComment = (comment, token) => {
  return fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: comment,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Ошибка сервера");
    }
  });
};

export const login = (login, password) => {
  return fetch(`${AUTH_URL}/login/`, {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Ошибка сервера");
    } else {
      return response.json();
    }
  });
};

export const register = (login, password, name) => {
  return fetch(`${AUTH_URL}`, {
    method: "POST",
    body: JSON.stringify({
      login: login,
      name: name,
      password: password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Ошибка сервера");
    } else {
      return response.json();
    }
  });
};
