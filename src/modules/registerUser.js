// Обработка страницы регистрации
import { renderApp } from '../script.js';
import { register } from './api.js';
import { setUser, setToken } from '../consts.js';

export function registerUser() {
    let isAuth = false;
    const registerFormEl = document.querySelector('.register-form');
    const loginEl = document.querySelector('.register-form-login');
    const nameEl = document.querySelector('.register-form-name');
    const passwordEl = document.querySelector('.register-form-password');
    let message = document.querySelector('.error-message');

    if (!message) {
        message = document.createElement('p');
        message.classList.add('error-message');
    }

    if (nameEl.value.length === 0) {
        message.textContent = 'Введите имя';
        registerFormEl.appendChild(message);
        return;
    }

    if (loginEl.value.length === 0) {
        message.textContent = 'Введите логин';
        registerFormEl.appendChild(message);
        return;
    }

    if (passwordEl.value.length === 0) {
        message.textContent = 'Введите пароль';
        registerFormEl.appendChild(message);
        return;
    }

    if (loginEl.value.length < 3 || passwordEl.value.length < 3) {
        message.textContent =
            'Длина логина или пароля не должна быть меньше 3 символов';
        registerFormEl.appendChild(message);
        return;
    }

    register(loginEl.value, nameEl.value, passwordEl.value)
        .catch((err) => {
            if (err.message === 'Ошибка сервера') {
                message.textContent =
                    'Пользователь с таким логином уже существует';
                registerFormEl.appendChild(message);
            }
        })
        .then((responseData) => {
            if (responseData) {
                localStorage.setItem('userName', responseData.user.name);
                localStorage.setItem('token', responseData.user.token);
                setUser(responseData.user.name);
                setToken(responseData.user.token);
                isAuth = true;
            }
        })
        .finally(() => {
            if (isAuth) {
                renderApp();
            }
        });
}
