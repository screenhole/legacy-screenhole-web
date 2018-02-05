import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

const URL = 'https://api.screenhole.net';

export function loginAction({ username, password }, history) {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/users/token`, { auth: { username, password } });

      dispatch({ type: AUTHENTICATED });

      localStorage.setItem('user_jwt', res.data.jwt);
      history.push('/');
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export function logoutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}
