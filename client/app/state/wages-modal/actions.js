export const OPEN = 'WAGES_MODAL_OPEN';
export const CLOSE = 'WAGES_MODAL_CLOSE';

export function close() {
  return {
    type: CLOSE,
  };
}

export function open() {
  return {
    type: OPEN,
  };
}

export function toggle() {
  return (dispatch, getState) => {
    const { wagesModal } = getState();

    if (wagesModal.isOpen) {
      dispatch(close());
    } else {
      dispatch(open());
    }
  };
}
