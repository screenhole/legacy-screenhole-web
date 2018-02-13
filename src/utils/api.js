import { create } from 'apisauce'

const api = create({
  baseURL: 'https://api.screenhole.net',
})

if (localStorage.getItem('user_token')) {
  api.setHeader('Authorization', `Bearer ${localStorage.getItem('user_token')}`);
}

api.hasAuthHeader = localStorage.getItem('user_token') !== null;

// {"id":"qN4tOb","username":"jacob","created_at":"2017-10-11T18:20:12.931Z","gravatar_hash":"fba602680c9902f13d0fd065326f336e","name":"Jacob Bijani","bio":"codin the holes","blocked":[],"email":"jacob@thinko.com","stats":{"grabs":200,"buttcoins":2396},"roles":[],"notes":[]}
api.currentUser = localStorage.getItem('user_current');

api.resetLocalStorage = () => {
  localStorage.removeItem('user_token');
  localStorage.removeItem('user_current');
}

export default api;
