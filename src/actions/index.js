import api from '../utils/api';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function loginAction({ username, password }, history) {
  return async (dispatch) => {
    await api.post('/users/token', { auth: { username, password } })
      .then((res) => {
        if (! res.ok) res.reject(res);

        dispatch({ type: AUTHENTICATED });
        localStorage.setItem('user_token', res.data.jwt);
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      });
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
    await api.get('/users/token/refresh')
      .then((res) => {
        if (! res.ok) res.reject(res);

        dispatch({ type: AUTHENTICATED });
        localStorage.setItem('user_token', res.data.jwt);
      })
      .catch((err) => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      });
  };
}
