import { renderMainPage } from "./modules/renderMainPage.js";
import { getComments, addComment } from "./modules/api.js";
import { renderComments } from "./modules/renderComments.js";
import { renderForm } from "./modules/renderForm.js";

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

function initButtonEventListener() {
  const button = document.querySelector(".add-form-button");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");

  button.addEventListener("click", () => {
    createComment(formNameElement, formTextElement);
  });
}

function initInputEventListener() {
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

function initEnterEventListener() {
  const formElement = document.querySelector(".add-form");
  const formTextElement = document.querySelector(".add-form-text");
  const formNameElement = document.querySelector(".add-form-name");

  formElement.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      createComment(formNameElement, formTextElement, event);
      // getComments(comments);
      // console.log("enter");
    }
  });
}

// Создание нового комментария
function createComment(formNameElement, formTextElement, event = null) {
  const eventCode = event ? event.code : event;
  const button = document.querySelector(".add-form-button");
  let name;
  let comment;
  if (eventCode === "Enter" || eventCode === null) {
    const formNameValue = formNameElement.value;
    const formTextValue = formTextElement.value;

    formNameValue === ""
      ? formNameElement.classList.add("error")
      : formNameElement.classList.remove("error");

    formTextValue === "" || formTextValue.match(/^\s*$/)
      ? formTextElement.classList.add("error")
      : formTextElement.classList.remove("error");

    if (
      formNameValue !== "" &&
      formTextValue !== "" &&
      !formTextValue.match(/^\s*$/)
    ) {
      name = formNameValue;
      comment = formTextValue;
      button.classList.add("disabled");
      button.setAttribute("disabled", true);
      const addForm = document.querySelector(".add-form");
      addForm.innerHTML = "<p>Комментарий добавляется...</p>";

      addComment(comment, name)
        .catch((error) => {
          if (error.message === "Ошибка сервера") {
            alert("Имя и комментарий должны быть не короче 3 символов");
          } else if (error.message === "Сервер сломался") {
            console.log("Сервер сломался, попробуйте позже");
            alert("Сервер сломался, попробуйте позже");
            createComment(formNameElement, formTextElement);
          } else if (error.message === "Failed to fetch") {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
        })
        .then(() => {
          button.classList.remove("disabled");
          button.removeAttribute("disabled");
          addForm.innerHTML = renderForm();
        })
        .finally(() => {
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
        });
      // .finally(() => {
      //   const button = document.querySelector(".add-form-button");
      //   const formElement = document.querySelector(".add-form");
      //   const formTextElement = formElement.querySelector(".add-form-text");
      //   const formNameElement = formElement.querySelector(".add-form-name");
      //   formTextElement.value = comment;
      //   formNameElement.value = name;

      //   formNameValue === "" || formNameValue.length < 3
      //     ? formNameElement.classList.add("error")
      //     : formNameElement.classList.remove("error");

      //   formTextValue === "" ||
      //   formTextValue.match(/^\s*$/) ||
      //   formTextValue.length < 3
      //     ? formTextElement.classList.add("error")
      //     : formTextElement.classList.remove("error");

      //   formElement?.addEventListener("keyup", (event) => {
      //     if (event.code === "Enter") {
      //       createComment(formNameElement, formTextElement, event);
      //       getComments();
      //     }
      //   });

      //   formElement?.addEventListener("input", () => {
      //     if (
      //       (formTextElement.value !== "" &&
      //         !formTextElement.value.match(/^\s*$/)) ||
      //       formNameElement.value !== ""
      //     ) {
      //       button.classList.remove("disabled");
      //       button.removeAttribute("disabled");
      //     }
      //   });

      //   button?.addEventListener("click", () => {
      //     createComment(formNameElement, formTextElement);
      //   });
      // });
    }
  }
}
