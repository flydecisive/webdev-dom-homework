export function renderMainPage(comments) {
    return `
      <button class='exit-button'>Выход</button>
      <ul class="comments">
        ${comments ?? '<img class="loader" src="./loader.svg" alt="loader"/>'}
      </ul>
      <div class="add-form">
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
      </div>
    `;
}
