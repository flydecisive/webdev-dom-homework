import { initLikesEventListeners } from './events.js';
import { format } from 'date-fns';

// рендер комментария
export const renderComments = (comments) => {
    const commentsEl = document.querySelector('.comments');

    const commentsHtml = comments
        .map((comment) => {
            return `<li class="comment" data-id="${comment.id}">
            <div class="comment-header">
              <div>${comment.author.name}</div>
              <div>${format(
                  new Date(comment.date),
                  'yyyy-MM-dd hh.mm.ss',
              )}</div>
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
                    comment.isLiked ? 'active-like' : ''
                }"></button>
              </div>
            </div> 
          </li>`;
        })
        .join('');

    commentsEl.innerHTML = commentsHtml;
    initLikesEventListeners(comments);
};
