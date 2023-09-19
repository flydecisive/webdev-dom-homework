import { getDate } from "../helpers.js";
import { initLikesEventListeners } from "./events.js";

// рендер комментария
export const renderComments = (comments) => {
  const commentsEl = document.querySelector(".comments");

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
                  comment.isLiked ? "-active-like" : ""
                }"></button>
              </div>
            </div> 
          </li>`;
    })
    .join("");

  commentsEl.innerHTML = commentsHtml;
  initLikesEventListeners(comments);
};
