import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  USER_REFRESH_TOKEN,
  USER_GET_CURRENT,
} from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false, current: {} };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case USER_GET_CURRENT:
      return { ...state, authenticated: true, current: action.payload };
    case USER_REFRESH_TOKEN:
      return { ...state, token: action.payload };
    default:
      return { ...state };
  }
  return state;
}
