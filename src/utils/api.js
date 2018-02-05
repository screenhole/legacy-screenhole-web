import { create } from 'apisauce'

const api = create({
  baseURL: 'https://api.screenhole.net',
})

if (localStorage.getItem('user_token')) {
  api.setHeader('Authorization', `Bearer ${localStorage.getItem('user_token')}`);
}

export default api;
