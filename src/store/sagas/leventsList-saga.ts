import {
    takeLatest,
    put,
    call,
  } from 'redux-saga/effects';

  import { TAIMSDATA } from '../../URL/URL';
  
  import * as actionTypes from '../actionTypes';
  
  function* getNewsWorker(): any {    
    try {
      const response = yield call(() => fetch(TAIMSDATA));
      const data = yield call(() =>  response.json());
      
      if (data) {
        yield put({ type: actionTypes.GET_DATA_SUCCESS, payload: data });
      } else {
        yield put({ type: actionTypes.GET_DATA_FAIL, payload:'Данные отсутствуют!' });
      }
    } catch (e: any) {
      yield put({ type: actionTypes.GET_DATA_FAIL, payload: e.message });
    }
  }
  
  
  export default function* newsWatcher() {
    yield takeLatest(actionTypes.GET_DATA, getNewsWorker);
  }