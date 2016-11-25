import { createReducer } from 'redux-create-reducer';

import { UPLOAD_FILE_SUCCESS } from 'state/wage-file-uploader';

const initialState = {
  wages: [],
};

export default createReducer(initialState, {
  [UPLOAD_FILE_SUCCESS](state, action) {
    return Object.assign({}, { wages: action.payload.data });
  },
});
