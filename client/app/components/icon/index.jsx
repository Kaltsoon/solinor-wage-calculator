import React from 'react';

class Icon extends React.Component {
  render() {
    const behaviorClass = this.props.behavior
      ? `fa-${this.props.behavior}`
      : '';

    return (
      <i className={`fa fa-${this.props.name} ${behaviorClass}`} />
    );
  }
}

Icon.propTypes = {
  name: React.PropTypes.string.isRequired,
  behavior: React.PropTypes.string,
};

export default Icon;
