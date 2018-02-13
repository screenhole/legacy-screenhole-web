import { create } from 'apisauce'

const api = create({
  baseURL: 'https://api.screenhole.net',
})

api.setCurrentUser = (user) => {
  localStorage.setItem('user_current', JSON.stringify(user));
  api.currentUser = user;
}

api.setAuthHeader = (token) => {
  localStorage.setItem('user_token', token);
  api.setHeader('Authorization', `Bearer ${token}`);
}

api.hasAuthHeader = () => {
  localStorage.getItem('user_token') !== null;
}

api.resetLocalStorage = () => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_current');
}

if (localStorage.getItem('user_token')) {
  api.setAuthHeader(localStorage.getItem('user_token'));
}

if (localStorage.getItem('user_current')) {
  api.setCurrentUser(JSON.parse(localStorage.getItem('user_current')));
}

export default api;
