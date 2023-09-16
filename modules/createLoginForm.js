export function createLoginForm() {
  return `
        <div class="login-form">
          <input
              type="text"
              class="login-form-login"
              placeholder="Логин"
          />
          <input
              type="text"
              class="login-form-password"
              placeholder="Пароль"
              rows="4"
          ></input>
          <div class="login-form-row">
              <button class="login-form-button-login">Войти</button>
              <button class="login-form-button-register">Зарегистрироваться</button>
          </div>
        </div> 
      `;
}
