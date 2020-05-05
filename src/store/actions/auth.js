import axios from 'axios';
import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyBDLeDyfiihsdgVLNznxPosWds_yyk6Ufc';

const authInit = () => ({
  type: actionTypes.AUTH_INIT,
});

const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId: localId,
});

const authError = (error) => ({
  type: actionTypes.AUTH_ERROR,
  error,
});

const authLogout = () => ({
  type: actionTypes.LOGOUT,
});

export const logout = () => {
  return (dispatch) => {
    dispatch(authLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
  };
};

// It gets a full date
const setAuthTimeout = (secondsLeft) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, secondsLeft * 1000);
  };
};

export const auth = (email, password, onLoginPage) => {
  return (dispatch) => {
    dispatch(authInit());
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    if (!onLoginPage) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((data) => {
        const { idToken, expiresIn, localId } = data.data;
        const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);

        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationTime', expirationTime);

        dispatch(authSuccess(idToken, localId));
        dispatch(setAuthTimeout(expiresIn));
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error.message));
      });
  };
};

export const autoCheckAuth = () => {
  // eslint-disable-next-line consistent-return
  return (dispatch) => {
    dispatch(authInit());
    const idToken = localStorage.getItem('token');
    if (!idToken) {
      return dispatch(logout());
    }
    const expirationDate = new Date(localStorage.getItem('expirationTime'));
    if (expirationDate < new Date()) {
      dispatch(logout());
    } else {
      axios
        .post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`, {
          idToken,
        })
        .then((response) => {
          dispatch(setAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
          dispatch(authSuccess(idToken, response.data.users[0].localId));
        })
        .catch((error) => dispatch(authError(error.response)));
    }
  };
};
