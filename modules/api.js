import { renderComments } from "./renderComments.js";
import { renderForm } from "./renderForm.js";

const button = document.querySelector(".add-form-button");

// Получение комментариев
export const getComments = async () => {
  return fetch("https://wedev-api.sky.pro/api/v1/maks-muhin/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      alert("Сервер сломался, попробуй позже");
    } else {
      return response.json();
    }
  });
};

export const addComment = (comment, name) => {
  return fetch("https://wedev-api.sky.pro/api/v1/maks-muhin/comments", {
    method: "POST",
    body: JSON.stringify({
      text: comment,
      name: name,
    }),
  }).then((response) => {
    console.log(response);
    if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else if (response.status === 400) {
      throw new Error("Ошибка сервера");
    }
  });
};
