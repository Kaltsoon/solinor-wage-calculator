import { createReducer } from 'redux-create-reducer';

import { SET_FILE, UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL } from './actions';

const initialState = {
  file: null,
};

export default createReducer(initialState, {
  [SET_FILE](state, action) {
    return Object.assign({}, state, { file: action.file, error: false });
  },
  [UPLOAD_FILE](state) {
    return Object.assign({}, state, { uploading: true });
  },
  [UPLOAD_FILE_SUCCESS](state) {
    return Object.assign({}, state, { uploading: false, error: false });
  },
  [UPLOAD_FILE_FAIL](state) {
    return Object.assign({}, state, { uploading: false, error: true });
  },
});
