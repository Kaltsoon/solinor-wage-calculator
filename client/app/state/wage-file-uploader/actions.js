import { open } from 'state/wages-modal';

export const SET_FILE = 'WAGE_FILE_UPLOADER_SET_FILE';
export const UPLOAD_FILE = 'WAGE_FILE_UPLOADER_UPLOAD_FILE';
export const UPLOAD_FILE_SUCCESS = 'WAGE_FILE_UPLOADER_UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAIL = 'WAGE_FILE_UPLOADER_UPLOAD_FILE_FAIL';

export function setFile(file) {
  return {
    type: SET_FILE,
    file,
  };
}

export function uploadFileRequest(data) {
  return {
    type: UPLOAD_FILE,
    payload: {
      request: {
        url: '/wage-files',
        data,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
  };
}

export function uploadFile() {
  return (dispatch, getState) => {
    const { wageFileUploader } = getState();

    if (wageFileUploader.file) {
      const data = new FormData();

      data.append('wageFile', wageFileUploader.file);

      dispatch(uploadFileRequest(data))
        .then((response) => {
          if (!response.error) {
            dispatch(open());
          }
        });
    }
  };
}
