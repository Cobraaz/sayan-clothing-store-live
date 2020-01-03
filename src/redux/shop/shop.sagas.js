import { takeEvery, put, call } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils.js";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from "./shop.actions";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}
