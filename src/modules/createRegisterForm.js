export function createRegisterForm() {
    return `
        <div class="register-form">
            <input
                type="text"
                class="register-form-name"
                placeholder="Имя"
            />
            <input
                type="text"
                class="register-form-login"
                placeholder="Логин"
            />
            <input
                type="text"
                class="register-form-password"
                placeholder="Пароль"
            ></input>
            <div class="register-form-row">
                <button class="register-form-button-register">Зарегистрироваться</button>
                <button class="register-form-button-login">Войти</button>
            </div>
        </div> 
        `;
}
