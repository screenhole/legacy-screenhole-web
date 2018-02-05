import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`;

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const URL = 'https://api.screenhole.net';

export function loginAction({ username, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/users/token`, { auth: { username, password } });

      dispatch({ type: AUTHENTICATED });

      localStorage.setItem('user_token', res.data.jwt);
      history.push('/');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export function logoutAction(history) {
  localStorage.clear();
  history.push('/');
  return {
    type: UNAUTHENTICATED
  };
}

export function refreshUserTokenAction() {
  return async (dispatch) => {
    try {
      console.log('hi');

      const res = await axios.get(`${URL}/users/token/refresh`);

      dispatch({ type: AUTHENTICATED });

      localStorage.setItem('user_token', res.data.jwt);
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}
