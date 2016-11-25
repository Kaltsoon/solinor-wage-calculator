import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

import { setFile } from 'state/wage-file-uploader';

class WageFileDrop extends React.Component {
  constructor() {
    super();
    this.onDropFile = this.onDropFile.bind(this);
  }

  onDropFile(acceptedFiles) {
    this.props.onFile(acceptedFiles[0]);
  }

  render() {
    return (
      <Dropzone
        className="wage-file-drop"
        activeClassName="wage-file-drop--active"
        multiple={false}
        onDrop={this.onDropFile}
      >
        <div>
         Drag a csv file here
        </div>
      </Dropzone>
    );
  }
}

WageFileDrop.propTypes = {
  onFile: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onFile: file => dispatch(setFile(file)),
});

export default connect(
  null,
  mapDispatchToProps,
)(WageFileDrop);
