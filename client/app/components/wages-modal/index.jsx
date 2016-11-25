import React from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import WagesTable from 'components/wages-table';
import { toggle } from 'state/wages-modal';

class WagesModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.onToggle}>
        <ModalHeader toggle={this.props.onToggle}>Wages</ModalHeader>
        <ModalBody>
          <WagesTable />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.onToggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

WagesModal.propTypes = {
  isOpen: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
};

const mapStateToProps = state => ({
  isOpen: state.wagesModal.isOpen,
});

const mapDispatchToProps = dispatch => ({
  onToggle: () => dispatch(toggle()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WagesModal);
