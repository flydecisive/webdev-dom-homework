import { addComment } from './api.js';
import { getComments } from './api.js';
import {
    initButtonEventListener,
    initEnterEventListener,
    initInputEventListener,
} from './events.js';
import { renderForm } from './renderForm.js';
import { renderComments } from './renderComments.js';
import { user } from '../../consts.js';

// Создание нового комментария
export function createComment(
    formNameElement,
    formTextElement,
    token,
    event = null,
) {
    const eventCode = event ? event.code : event;
    const button = document.querySelector('.add-form-button');
    let comment;

    if (eventCode === 'Enter' || eventCode === null) {
        const formTextValue = formTextElement.value;
        formTextValue === '' || formTextValue.match(/^\s*$/)
            ? formTextElement.classList.add('error')
            : formTextElement.classList.remove('error');

        if (formTextValue !== '' && !formTextValue.match(/^\s*$/)) {
            comment = formTextValue;
            button.classList.add('disabled');
            button.setAttribute('disabled', true);
            const addForm = document.querySelector('.add-form');
            addForm.innerHTML = '<p>Комментарий добавляется...</p>';

            addComment(comment, token)
                .catch((error) => {
                    if (error.message === 'Ошибка сервера') {
                        alert(
                            'Имя и комментарий должны быть не короче 3 символов',
                        );
                    } else if (error.message === 'Сервер сломался') {
                        console.log('Сервер сломался, попробуйте позже');
                        alert('Сервер сломался, попробуйте позже');
                        createComment(formNameElement, formTextElement);
                    } else if (error.message === 'Failed to fetch') {
                        alert(
                            'Кажется, у вас сломался интернет, попробуйте позже',
                        );
                    }
                })
                .then(() => {
                    button.classList.remove('disabled');
                    button.removeAttribute('disabled');
                    addForm.innerHTML = renderForm();
                })
                .finally(() => {
                    getComments()
                        .then((responseData) => {
                            renderComments(responseData.comments);
                        })
                        .catch((error) => {
                            if (error.message === 'Failed to fetch') {
                                alert(
                                    'Кажется, у вас сломался интернет, попробуйте позже',
                                );
                            }
                        })
                        .finally(() => {
                            const addFormName =
                                document.querySelector('.add-form-name');
                            addFormName.value = user;
                            addFormName.setAttribute('disabled', true);
                            initButtonEventListener();
                            initInputEventListener();
                            initEnterEventListener();
                        });
                });
        }
    }
}
