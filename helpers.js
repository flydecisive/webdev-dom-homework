let comments = [];
// const loader = '<img class="loader" />'

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

// Задержка для лайков
function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

// Получение комментариев
const getComments = async () => {
  fetch('https://wedev-api.sky.pro/api/v1/maks-muhin/comments', {
    method: 'GET'
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
    renderComments();
  })
  .catch((error) => {
    if (error.message === 'Failed to fetch') {
      alert('Кажется, у вас сломался интернет, попробуйте позже');
    }
  })
  .finally(() => {
    const loader = document.querySelector('.loader');
    loader?.remove();
  })
}

// Кнопка редактировать
// <button class=${
          //   comment.isEdit ? 'save-form-button' : 'edit-form-button'
          // }>${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>

// рендер комментария
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

// const formElement = document.querySelector('.add-form');
// const formTextElement = formElement.querySelector('.add-form-text');
// const formNameElement = formElement.querySelector('.add-form-name');

// Создание нового комментария
const createComment = (formNameElement, formTextElement, event = null) => {
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
      addForm.innerHTML = '<p>Комментарий добавляется...</p>'

      fetch('https://wedev-api.sky.pro/api/v1/maks-muhin/comments', {
        method: 'POST',
        body: JSON.stringify({
          text: comment,
          name: name
        })
      })
      .then((response) => {
        if (response.status === 500) {
          // alert('Сервер сломался, попробуйте позже');
          // createComment(formNameElement, formTextElement);
          throw new Error('Сервер сломался');
        } else if(response.status === 400) {
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

        formTextValue === '' || formTextValue.match(/^\s*$/) || formTextValue.length < 3
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

  target.classList.add('-loading-like');

  delay(2000).then(() => {
    comment.likes = comment.isLiked
      ? comment.likes - 1
      : comment.likes + 1;
    comment.isLiked = !comment.isLiked;
    renderComments();
  }).finally(() => {
    target.classList.remove('-loading-like');
  })
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

//       saveButton.addEventListener('click', () => {
//         comments[id].isEdit = false;
//         renderComments(commentsElement);
//       });
//     });
//   });
// };
