import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

type coordinatesType = {
  id: number,
  duration: number,
  timestamp: number,
  zone: {
    height: number,
    left: number,
    top: number,
    width: number,
  } 
};

type initialStateType = {
  coordinates: any,
  loading: boolean,
  error?: string | null | coordinatesType,
};

type actionType = {
  type?: string,
  payload?: coordinatesType | string,
};

const initialState: initialStateType = {
  coordinates: [],
  loading: false,
  error: null,
};

export default function dataReducer(state = initialState, action: actionType  = {}) {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return {
        ...state,
        loading: true,
        coordinates: [],
        error: null,
      };
      case actionTypes.GET_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          coordinates: action.payload,
          error: null,
        };
      case actionTypes.GET_DATA_FAIL:
        return {
          ...state,
          loading: false,
          coordinates: [],
          error: action.payload,
        };
    default:
      return state;
  }
};
