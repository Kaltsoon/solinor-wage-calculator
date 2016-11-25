import React from 'react';

import WageFileUploader from 'components/wage-file-uploader';

class AppContent extends React.Component {
  render() {
    return (
      <div className="app__content text-xs-center mt-2">
        <WageFileUploader />
      </div>
    );
  }
}

export default AppContent;
