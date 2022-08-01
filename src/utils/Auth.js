export const baseUrl = 'https://auth.nomoreparties.co';
const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  if (res.ok)
    return res.json();

  return Promise.reject(`Возникла ошибка ${res.status}: ${res.statusText}`);
}


export const signup = ({ email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res))
}


