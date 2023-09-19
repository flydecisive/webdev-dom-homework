let token = localStorage.getItem("token");

function setToken(newToken) {
  token = newToken;
}

let user = localStorage.getItem("userName");

function setUser(newUser) {
  user = newUser;
}

export { token, setToken, user, setUser };
