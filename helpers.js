// данные комментариев
const comments = [
  {
    id: 0,
    name: 'Глеб Фокин',
    date: '12.02.22 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likesCount: 3,
    isLiked: false,
    isEdit: false,
  },
  {
    id: 1,
    name: 'Варвара Н.',
    date: '13.02.22 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likesCount: 75,
    isLiked: true,
    isEdit: false,
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
      return `<li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div class='comment-name'>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${
                comment.isEdit
                  ? '<textarea class="edit-comment"></textarea>'
                  : comment.text
              }
            </div>
          </div>
          <div class="comment-footer">
            <button class=${
              comment.isEdit ? 'save-form-button' : 'edit-form-button'
            }>${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>
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
  initEditButtonEventListeners();
  initCommentEventListeners();
};

// Добавление обработчика события для цитирования комментария
const initCommentEventListeners = () => {
  const comments = document.querySelectorAll('.comment');

  comments.forEach((comment) => {
    comment.addEventListener('click', (e) => {
      const { target } = e;
      if (!target.closest('.comment-footer')) {
        getQuotingComment(target.closest('.comment'));
      }
    });
  });
};

// получение цитируемого комментария
const getQuotingComment = (elem) => {
  const name = elem.querySelector('.comment-name').textContent.trim();
  const text = elem.querySelector('.comment-text').textContent.trim();
  const addFormText = document.querySelector('.add-form-text');
  addFormText.textContent = `${name}:\n${text}`;
};

// добавление обработчика события для лайка
const initLikesEventListeners = () => {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', (e) => toggleLike(e));
  });
};

// добавление обработчика события для кнопки удаления
const initEditButtonEventListeners = () => {
  const editButtons = document.querySelectorAll('.edit-form-button');

  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', (e) => {
      const id = e.target.closest('.comment').dataset.id;
      comments[id].isEdit = true;

      renderComments(commentsElement);

      const editComment = document.querySelector('.edit-comment');
      editComment.textContent = comments[id].text;

      editComment.addEventListener('input', (e) => {
        comments[id].text = e.target.value;
      });
      const saveButton = document.querySelector('.save-form-button');

      saveButton.addEventListener('click', () => {
        comments[id].isEdit = false;
        renderComments(commentsElement);
      });
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
      comment = formTextValue.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

      comments.push({
        id: comments.length,
        name: name,
        date: getDate(),
        text: comment,
        likesCount: 0,
        isLiked: false,
        isEdit: false,
      });
    }
  }
};

// смена лайка при нажатии
const toggleLike = (e) => {
  const target = e.target;
  const id = target.closest('.comment').dataset.id;
  const comment = comments[+id];

  if (comment.isLiked) {
    comment.isLiked = false;
    comment.likesCount -= 1;
  } else {
    comment.isLiked = true;
    comment.likesCount += 1;
  }

  const parent = document.querySelector('.comments');
  renderComments(parent);
};
