export const baseUrl = 'https://auth.nomoreparties.co';
const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  if (res.ok)
    return res.json();

  return Promise.reject(`Возникла ошибка ${res.status}`);
}


export const signup = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
}

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
}
