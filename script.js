('use strict');
import { getComments } from './modules/api.js';
import { createComment } from './modules/api.js';
import { comments } from './modules/comments.js';

const button = document.querySelector('.add-form-button');
const formElement = document.querySelector('.add-form');
const formTextElement = formElement.querySelector('.add-form-text');
const formNameElement = formElement.querySelector('.add-form-name');

getComments(comments);

formElement.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') {
    createComment(formNameElement, formTextElement, event);
    getComments(comments);
  }
});

formElement.addEventListener('input', () => {
  if (
    (formTextElement.value !== '' && !formTextElement.value.match(/^\s*$/)) ||
    formNameElement.value !== ''
  ) {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  }
});

button.addEventListener('click', () => {
  createComment(formNameElement, formTextElement);
});
