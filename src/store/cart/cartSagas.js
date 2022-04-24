import {takeEvery, call, put } from 'redux-saga/effects';
import { CART_ITEM_PRODUCT_REQUEST,REMOVE_ITEM_FROM_CART_REQUEST } from './cartActions';
import httpConfig from "../../api/httpConfig";

function* getCartItemProduct(action) {
  try {
    const payload = yield call(
      { content: "", fn: "" },
      action.payload,
    );
  } catch (error) {
    console.log(error)
  }
}

function* removeItemFromCart({ payload }) {
  try {
    yield put({ type: 'REMOVE_ITEM_FROM_CART_LOADING' });
    const isSuccessfullyRemoved = yield call(
      { content: httpConfig, fn: httpConfig.removeItemFromCart },
      payload.itemId,
    );
    yield put({
      type: 'REMOVE_ITEM_FROM_CART_SUCCESS',
      payload: { isSuccessfullyRemoved },
    });
    yield put({ type: 'CUSTOMER_CART_REQUEST' });
  } catch (error) {
    yield put({
      type:'REMOVE_ITEM_FROM_CART_FAILURE',
      payload: error.message,
    });
  }
}

export default function* watcherSaga() {
  yield takeEvery(CART_ITEM_PRODUCT_REQUEST, getCartItemProduct);
  yield takeEvery(REMOVE_ITEM_FROM_CART_REQUEST, removeItemFromCart);
}
