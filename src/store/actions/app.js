import axiosFirebase from 'axios-firebase';
import * as actionTypes from './actionTypes';

export const deleteItemSuccess = (itemType, id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    itemType,
    id,
  };
};

const addItemSuccess = (itemType, itemContent, id) => {
  return {
    type: actionTypes.ADD_ITEM_SUCCESS,
    itemType,
    item: {
      id,
      ...itemContent,
    },
  };
};

const fetchError = (error) => {
  return {
    type: actionTypes.FETCH_ERROR,
    error,
  };
};

const fetchInit = () => {
  return {
    type: actionTypes.FETCH_INIT,
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const addItem = (token, itemType, itemContent) => {
  return (dispatch) => {
    dispatch(fetchInit());
    axiosFirebase
      .post(`/items.json?auth=${token}`, { ...itemContent, itemType })
      .then((response) => {
        const id = response.data.name;
        if (id) {
          dispatch(addItemSuccess(itemType, itemContent, id));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.response));
      });
  };
};

export const fetchItems = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchInit());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axiosFirebase
      .get(`/items.json${queryParams}`)
      .then((response) => {
        const itemKeys = Object.keys(response.data);
        const resultArray = Object.values(response.data);
        resultArray.forEach((item, index) => {
          dispatch(addItemSuccess(item.itemType, { ...item }, itemKeys[index]));
        });
      })
      .catch((error) => {
        dispatch(fetchError(error.response));
      });
  };
};

export const removeItem = (itemType, itemId, token) => {
  return (dispatch) => {
    axiosFirebase
      .delete(`/items/${itemId}.json?auth=${token}`)
      .then(() => {
        dispatch(deleteItemSuccess(itemType, itemId));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
};

export const filterData = (filterValue) => ({
  type: actionTypes.PASS_FILTER_VALUE,
  filterValue,
});
