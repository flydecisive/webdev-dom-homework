// import { renderComments } from "./renderComments.js";
// import { renderForm } from "./renderForm.js";

// const button = document.querySelector(".add-form-button");

const API_URL = "https://wedev-api.sky.pro/api/v2/m-m";
const AUTH_URL = "https://wedev-api.sky.pro/api/user";
const token =
  "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

// Получение комментариев
export const getComments = async () => {
  return fetch(`${API_URL}/comments`, {
    method: "GET",
    headers: {
      Authorization: token,
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
export const addComment = (comment, name) => {
  return fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      Authorization: token,
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
