import { token } from '../../consts.js';

const API_URL = 'https://wedev-api.sky.pro/api/v2/maks-muhin';
const AUTH_URL = 'https://wedev-api.sky.pro/api/user';

// Получение комментариев
export const getComments = async () => {
    return fetch(`${API_URL}/comments`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 500) {
            alert('Сервер сломался, попробуй позже');
        } else {
            return response.json();
        }
    });
};

// Добавление комментария
export const addComment = (comment) => {
    return fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: comment,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался');
        } else if (response.status === 400) {
            throw new Error('Ошибка сервера');
        }
    });
};

export const like = (id) => {
    return fetch(`${API_URL}/comments/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался');
        } else if (response.status === 400) {
            throw new Error('Ошибка сервера');
        } else if (response.status === 401) {
            throw new Error('Ошибка авторизации');
        } else {
            return response.json();
        }
    });
};

export const login = (login, password) => {
    return fetch(`${AUTH_URL}/login/`, {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался');
        } else if (response.status === 400) {
            throw new Error('Ошибка сервера');
        } else {
            return response.json();
        }
    });
};

export const register = (login, name, password) => {
    return fetch(`${AUTH_URL}`, {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            name: name,
            password: password,
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер сломался');
        } else if (response.status === 400) {
            throw new Error('Ошибка сервера');
        } else {
            return response.json();
        }
    });
};
