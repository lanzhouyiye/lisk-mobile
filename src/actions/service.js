import { service as serviceAPI } from '../utilities/api';
import actionTypes from '../constants/actions';

export const pricesRetrieved = () => (dispatch, getState) => {
  const { settings: { token } } = getState();

  serviceAPI.getPriceTicker(token)
    .then(priceTicker => dispatch({
      type: actionTypes.pricesRetrieved,
      priceTicker,
    }))
    .catch(err => console.log(err)); // @TODO: DISCUSS & HANDLE THIS!
};

export const dynamicFeesRetrieved = () => (dispatch, getState) => {
  const { settings: { token } } = getState();

  serviceAPI.getDynamicFees(token)
    .then(dynamicFees => dispatch({
      type: actionTypes.dynamicFeesRetrieved,
      dynamicFees,
    }))
    .catch(err => console.log(err)); // @TODO: DISCUSS & HANDLE THIS!
};
