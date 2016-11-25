import { createReducer } from 'redux-create-reducer';

import { OPEN, CLOSE } from './actions';

const initialState = {
  isOpen: false,
};

export default createReducer(initialState, {
  [OPEN](state) {
    return Object.assign({}, state, { isOpen: true });
  },
  [CLOSE](state) {
    return Object.assign({}, state, { isOpen: false });
  },
});
