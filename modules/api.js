import { renderComments } from './renderComments.js';
import { renderForm } from './renderForm.js';

const button = document.querySelector('.add-form-button');

// Получение комментариев
export const getComments = async (comments) => {
  fetch('https://wedev-api.sky.pro/api/v1/maks-muhin/comments', {
    method: 'GET',
  })
    .then((response) => {
      if (response.status === 500) {
        alert('Сервер сломался, попробуй позже');
      } else {
        return response.json();
      }
    })
    .then((responseData) => {
      comments = responseData.comments.map((el) => el);
      renderComments(comments);
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      }
    })
    .finally(() => {
      const loader = document.querySelector('.loader');
      loader?.remove();
    });
};

// Создание нового комментария
export const createComment = (
  formNameElement,
  formTextElement,
  event = null
) => {
  const eventCode = event ? event.code : event;
  let name;
  let comment;
  if (eventCode === 'Enter' || eventCode === null) {
    const formNameValue = formNameElement.value;
    const formTextValue = formTextElement.value;

    formNameValue === ''
      ? formNameElement.classList.add('error')
      : formNameElement.classList.remove('error');

    formTextValue === '' || formTextValue.match(/^\s*$/)
      ? formTextElement.classList.add('error')
      : formTextElement.classList.remove('error');

    if (
      formNameValue !== '' &&
      formTextValue !== '' &&
      !formTextValue.match(/^\s*$/)
    ) {
      name = formNameValue;
      comment = formTextValue;
      button.classList.add('disabled');
      button.setAttribute('disabled', true);
      const addForm = document.querySelector('.add-form');
      addForm.innerHTML = '<p>Комментарий добавляется...</p>';

      fetch('https://wedev-api.sky.pro/api/v1/maks-muhin/comments', {
        method: 'POST',
        body: JSON.stringify({
          text: comment,
          name: name,
        }),
      })
        .then((response) => {
          if (response.status === 500) {
            throw new Error('Сервер сломался');
          } else if (response.status === 400) {
            throw new Error('Ошибка сервера');
          } else {
            getComments();
            comment = '';
            name = '';
          }
        })
        .catch((error) => {
          if (error.message === 'Ошибка сервера') {
            alert('Имя и комментарий должны быть не короче 3 символов');
          } else if (error.message === 'Сервер сломался') {
            console.log('Сервер сломался, попробуйте позже');
            alert('Сервер сломался, попробуйте позже');
            createComment(formNameElement, formTextElement);
          } else if (error.message === 'Failed to fetch') {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
          }
        })
        .then(() => {
          button.classList.remove('disabled');
          button.removeAttribute('disabled');
          renderForm(addForm);
        })
        .finally(() => {
          const button = document.querySelector('.add-form-button');
          const formElement = document.querySelector('.add-form');
          const formTextElement = formElement.querySelector('.add-form-text');
          const formNameElement = formElement.querySelector('.add-form-name');
          formTextElement.value = comment;
          formNameElement.value = name;

          formNameValue === '' || formNameValue.length < 3
            ? formNameElement.classList.add('error')
            : formNameElement.classList.remove('error');

          formTextValue === '' ||
          formTextValue.match(/^\s*$/) ||
          formTextValue.length < 3
            ? formTextElement.classList.add('error')
            : formTextElement.classList.remove('error');

          formElement?.addEventListener('keyup', (event) => {
            if (event.code === 'Enter') {
              createComment(formNameElement, formTextElement, event);
              getComments();
            }
          });

          formElement?.addEventListener('input', () => {
            if (
              (formTextElement.value !== '' &&
                !formTextElement.value.match(/^\s*$/)) ||
              formNameElement.value !== ''
            ) {
              button.classList.remove('disabled');
              button.removeAttribute('disabled');
            }
          });

          button?.addEventListener('click', () => {
            createComment(formNameElement, formTextElement);
          });
        });
    }
  }
};
