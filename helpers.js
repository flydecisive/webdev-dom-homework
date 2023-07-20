// данные комментариев
const comments = [
  {
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likesCount: 3,
    isLiked: false,
  },
  {
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likesCount: 75,
    isLiked: true,
  },
];

// Получение даты комментария
const getDate = () => {
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
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  result += `${day}.${months[month]}.${year} ${hour}:${
    minutes / 10 < 1 ? `0${minutes}` : minutes
  }`;
  return result;
};

// рендер комментария
const renderComments = (parent) => {
  const commentsHtml = comments
    .map((comment) => {
      return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesCount}</span>
              <button class="like-button ${
                comment.isLiked ? '-active-like' : ''
              }"></button>
            </div>
          </div>
        </li>`;
    })
    .join('');

  parent.innerHTML = commentsHtml;

  initLikesEventListeners();
};

// добавление обработчика события для лайка
const initLikesEventListeners = () => {
  const commentElements = document.querySelectorAll('.comment');

  commentElements.forEach((commentElement) => {
    commentElement.addEventListener('click', (e) => {
      console.log(e);
    });
  });
};

// Создание нового комментария
const createComment = (formNameElement, formTextElement, event = null) => {
  const eventCode = event ? event.code : event;
  if (eventCode === 'Enter' || eventCode === null) {
    let name = '';
    let comment = '';

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

      comments.push({
        name: name,
        date: getDate(),
        text: comment,
        likesCount: 0,
        isLiked: false,
      });
    }
  }
};

// Смена лайка при нажатии
// const toggleLike = (elements) => {
//   const likes = [];
//   elements.forEach((element) => {
//     likes.push(element.querySelector('.likes'));
//   });
//   likes.forEach((like) => {
//     like.addEventListener('click', () => {
//       const likesCounter = like.querySelector('.likes-counter');
//       const likeButton = like.querySelector('.like-button');
//       const activeLike = likeButton.classList.contains('-active-like');

//       if (activeLike) {
//         likeButton.classList.remove('-active-like');
//         likesCounter.textContent = Number(likesCounter.textContent) - 1;
//       } else {
//         likeButton.classList.add('-active-like');
//         likesCounter.textContent = Number(likesCounter.textContent) + 1;
//       }
//     });
//   });
// };
