import { combineReducers } from 'redux';

import wageFileUploader from 'state/wage-file-uploader';
import wagesModal from 'state/wages-modal';
import wagesTable from 'state/wages-table';

export default combineReducers({
  wageFileUploader,
  wagesModal,
  wagesTable,
});
