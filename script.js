import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments, addComment } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import { renderForm } from "./modules/renderForm.js";
import {
  initButtonEventListener,
  initInputEventListener,
  initEnterEventListener,
} from "./modules/events.js";
import { createComment } from "./modules/createComment.js";

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
