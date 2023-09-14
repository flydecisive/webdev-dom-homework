import { createComment } from "./createComment.js";

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
