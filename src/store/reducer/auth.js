import * as actionTypes from 'store/actions/actionTypes';

const initState = {
  idToken: null,
  userId: null,
  isLoading: false,
  errorMsg: null,
};

const authInit = (state) => ({
  ...state,
  isLoading: true,
  errorMsg: null,
});

const authSuccess = (state, action) => ({
  ...state,
  isLoading: false,
  idToken: action.idToken,
  userId: action.userId,
});

const authError = (state, action) => ({
  ...state,
  isLoading: false,
  errorMsg: action.error,
});

const logout = (state) => ({
  ...state,
  idToken: null,
  isLoading: false,
});

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return authInit(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_ERROR:
      return authError(state, action);
    case actionTypes.LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default authReducer;
