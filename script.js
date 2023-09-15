import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import {
  initButtonEventListener,
  initInputEventListener,
  initEnterEventListener,
} from "./modules/events.js";

// Если есть токен то показывать главную страницу, если нет, то показывать страницу аториззации

let comments;
let user = "Admin";

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
      const addFormName = document.querySelector(".add-form-name");
      addFormName.value = user;
      addFormName.setAttribute("disabled", true);
      initButtonEventListener();
      initInputEventListener();
      initEnterEventListener();
    });
}
