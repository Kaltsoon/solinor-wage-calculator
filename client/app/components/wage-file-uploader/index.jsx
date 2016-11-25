import React from 'react';
import { connect } from 'react-redux';
import { Button, Alert } from 'reactstrap';

import Icon from 'components/icon';
import WageFileDrop from 'components/wage-file-drop';
import { uploadFile } from 'state/wage-file-uploader';

function renderError() {
  return (
    <Alert color="danger">
      Couldn't calculate wages from the file. Maybe its malformed?
    </Alert>
  );
}

class WageFileUploader extends React.Component {
  renderFooter() {
    return (
      <div className="mt-1">
        <Alert color="success">
          {this.props.file.name} uploaded
        </Alert>

        {this.props.error && renderError()}

        <div className="mt-1">
          <Button
            color="primary"
            disabled={this.props.uploading}
            size="lg"
            onClick={this.props.onUpload}
          >
            <Icon name="calculator" /> {this.props.uploading ? 'Calculating...' : 'Calculate wages' }
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="wage-file-uploader">
        <WageFileDrop />

        {this.props.file && this.renderFooter()}
      </div>
    );
  }
}

WageFileUploader.propTypes = {
  file: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
  onUpload: React.PropTypes.func,
  uploading: React.PropTypes.bool,
  error: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  file: state.wageFileUploader.file,
  uploading: state.wageFileUploader.uploading,
  error: state.wageFileUploader.error,
});

const mapDispatchToProps = dispatch => ({
  onUpload: () => dispatch(uploadFile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WageFileUploader);
