export function renderForm(addForm) {
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
    `;
}
