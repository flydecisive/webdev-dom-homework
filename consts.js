let token = localStorage.getItem("token");

function setToken(newToken) {
  token = newToken;
}

let user = localStorage.getItem("userName");

function setUser(newUser) {
  user = newUser;
}

let comments;

function setComments(newComments) {
  comments = newComments;
}

export { token, setToken, user, setUser, comments, setComments };
