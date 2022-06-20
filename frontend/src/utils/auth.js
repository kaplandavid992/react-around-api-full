const BASE_URL = "https://david.students.nomoreparties.sbs";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

const customFetch = (path, method, headers, data) =>
  fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(data),
  }).then(checkResponse);

export const register = (password, email) => {
  const method = "POST";
  const path = "/signup";
  const data = { password, email };
  return customFetch(path, method, headers, data);
};

export const authorize = (password, email) => {
  const method = "POST";
  const path = "/signin";
  const data = { password, email };
  return customFetch(path, method, headers, data);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse);
};
