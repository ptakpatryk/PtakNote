import * as actionTypes from 'store/actions/actionTypes';

const initState = {
  twitters: [],
  notes: [],
  articles: [],
  isLoading: false,
  error: null,
  filterValue: '',
  itemsQuantity: {
    twitters: 0,
    notes: 0,
    articles: 0,
  },
};

const removeItem = (state, action) => ({
  ...state,
  [action.itemType]: [...state[action.itemType].filter((el) => el.id !== action.id)],
  itemsQuantity: {
    ...state.itemsQuantity,
    [action.itemType]: state.itemsQuantity[action.itemType] - 1,
  },
});

const addItem = (state, action) => {
  return {
    ...state,
    [action.itemType]: [...state[action.itemType], action.item],
    itemsQuantity: {
      ...state.itemsQuantity,
      [action.itemType]: state.itemsQuantity[action.itemType] + 1,
    },
  };
};

const fetchInit = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

const fetchError = (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error,
});

const clearError = (state) => ({
  ...state,
  error: null,
});

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);
    case actionTypes.ADD_ITEM_SUCCESS:
      return addItem(state, action);
    case actionTypes.FETCH_INIT:
      return fetchInit(state);
    case actionTypes.FETCH_ERROR:
      return fetchError(state, action);
    case actionTypes.CLEAR_ERROR:
      return clearError(state);
    case actionTypes.PASS_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.filterValue,
      };
    default:
      return state;
  }
};

export default rootReducer;
