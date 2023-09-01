let comments = [];

// Получение даты комментария
const getDate = (data=null) => {
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

  result += `${day / 10 < 1 ? `0${day}` : day}.${months[month]}.${year} ${hour}:${
    minutes / 10 < 1 ? `0${minutes}` : minutes
  }`;
  return result;
};


// Получение комментариев и рендер
const getComments = async () => {
  fetch('https://wedev-api.sky.pro/api/v1/adsasd-asddasd/comments', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).then((responseData) => {
    comments = responseData.comments.map((el) => el);
    renderComments();
  }).finally(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hide');
  })
}

// Кнопка редактировать
// <button class=${
          //   comment.isEdit ? 'save-form-button' : 'edit-form-button'
          // }>${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>

// рендер комментариев
const renderComments = () => {
  const parent = document.querySelector('.comments');

  const commentsHtml = comments
    .map((comment) => {
      return `<li class="comment" data-id="${comment.id}">
          <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${getDate(comment.date)}</div>
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
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
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
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', (e) => toggleLike(e));
  });
};

// добавление обработчика события для кнопки удаления
// const initEditButtonEventListeners = () => {
//   const editButtons = document.querySelectorAll('.edit-form-button');

//   editButtons.forEach((editButton) => {
//     editButton.addEventListener('click', (e) => {
//       const id = e.target.closest('.comment').dataset.id;
//       comments[id].isEdit = true;

//       renderComments(commentsElement);

//       const editComment = document.querySelector('.edit-comment');
//       editComment.textContent = comments[id].text;

//       editComment.addEventListener('input', (e) => {
//         comments[id].text = e.target.value;
//       });
//       const saveButton = document.querySelector('.save-form-button');

//       saveB;utton.addEventListener('click', () => {
//         comments[id].isEdit = false;
//         renderComments(commentsElement);
//       });
//     });
//   });
// };

// Создание нового комментария
const createComment = (formNameElement, formTextElement, event = null) => {
  const eventCode = event ? event.code : event;
  if (eventCode === 'Enter' || eventCode === null) {
    let name = '';
    let comment = '';

    let formNameValue = formNameElement.value;
    let formTextValue = formTextElement.value;

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
      console.log(comment);
      console.log(name);
      button.classList.add('disabled');
      button.setAttribute('disabled', true);
      const addForm = document.querySelector('.add-form');
      addForm.innerHTML = '<p>Комментарий добавляется...</p>'

      fetch('https://wedev-api.sky.pro/api/v1/adsasd-asddasd/comments', {
        method: 'POST',
        body: JSON.stringify({
          text: comment,
          name: name
        })
      })
      .then((response) => {
        if (response.status === 201) {
          getComments();
        }
      })
      .finally(() => {
        button.classList.remove('disabled');
        button.removeAttribute('disabled');
        addForm.innerHTML = `
        <input
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button">Написать</button>
        </div>
        `
      })
    }  
  }
};

// смена лайка при нажатии
const toggleLike = (e) => {
  const target = e.target;
  const id = target.closest('.comment').dataset.id;
  let comment;

  for (let i = 0; i < comments.length; i += 1) {
    if (comments[i].id === +id) {
      comment = comments[i];
    }
  }

  if (comment.isLiked) {
    comment.isLiked = false;
    comment.likes -= 1;
  } else {
    comment.isLiked = true;
    comment.likes += 1;
  }

  const parent = document.querySelector('.comments');
  renderComments(parent);
};
