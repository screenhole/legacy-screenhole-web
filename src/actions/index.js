import api from '../utils/api';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const USER_GET_CURRENT = 'user_get_current';
export const USER_REFRESH_TOKEN = 'user_refresh_token';

export function loginAction({ username, password }, history) {
  return async (dispatch) => {
    await api.post('/users/token', { auth: { username, password } })
      .then((res) => {
        if (! res.ok) res.reject(res);
        // save JWT
        localStorage.setItem('user_token', res.data.jwt);

        // get current user from JWT
        dispatch(userGetCurrent());
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
  // purge storage
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

        // update stored JWT
        localStorage.setItem('user_token', res.data.jwt);

        // save current user in redux store
        dispatch({ type: USER_REFRESH_TOKEN, payload: res.data.jwt });
      })
      .catch((err) => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      });
  };
}

export function userGetCurrent() {
  return async (dispatch) => {
    await api.get('/users/current')
      .then((res) => {
        if (! res.ok) res.reject(res);

        // save current user in redux store
        dispatch({ type: USER_GET_CURRENT, payload: res.data.user });
      })
      .catch((err) => {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: 'Invalid email or password'
        });
      });
  };
}
