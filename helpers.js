import { renderComments } from './modules/renderComments.js';

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

// Задержка для лайков
export function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// добавление обработчика события для лайка
export const initLikesEventListeners = (comments) => {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', (e) => toggleLike(e, comments));
  });
};

// смена лайка при нажатии
export const toggleLike = (e, comments) => {
  const target = e.target;
  const id = target.closest('.comment').dataset.id;
  let comment;

  for (let i = 0; i < comments.length; i += 1) {
    if (comments[i].id === +id) {
      comment = comments[i];
    }
  }

  target.classList.add('-loading-like');

  delay(2000)
    .then(() => {
      comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
      comment.isLiked = !comment.isLiked;
      renderComments(comments);
    })
    .finally(() => {
      target.classList.remove('-loading-like');
    });
};
