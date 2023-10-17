import { renderComments } from './modules/renderComments.js';
import { like, getComments } from './modules/api.js';
import { token } from './consts.js';
import { setComments } from './consts.js';

// Получение даты комментария
export const getDate = (data = null) => {
    const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ];
    let result = '';
    const date = data ? new Date(data) : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    result += `${day / 10 < 1 ? `0${day}` : day}.${
        months[month]
    }.${year} ${hour}:${minutes / 10 < 1 ? `0${minutes}` : minutes}`;
    return result;
};

// смена лайка при нажатии
export const toggleLike = (e, comments) => {
    const target = e.target;
    const id = target.closest('.comment').dataset.id;
    // let comment;

    // for (let i = 0; i < comments.length; i += 1) {
    //     if (comments[i].id === id) {
    //         comment = comments[i];
    //     }
    // }

    target.classList.add('loading-like');

    like(id)
        .catch((err) => {
            if (err.message === 'Ошибка авторизации') {
                alert('Необходимо авторизоваться, чтобы ставить лайки');
            }
        })
        .then(() => {
            getComments(token)
                .catch((error) => {
                    if (error.message === 'Failed to fetch') {
                        alert(
                            'Кажется, у вас сломался интернет, попробуйте позже',
                        );
                    }
                })
                .then((responseData) => {
                    setComments(comments);
                    renderComments(responseData.comments);
                })
                .finally(() => {
                    target.classList.remove('loading-like');
                });
        });
};
