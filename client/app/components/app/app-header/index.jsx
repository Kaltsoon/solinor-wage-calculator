import React from 'react';

class AppHeader extends React.Component {
  render() {
    return (
      <div className="app__header text-xs-center">
        <h1>
          I'm <span className="text-primary">Solinor's</span> Wage Calculator.
        </h1>

        <h4 className="text-muted">Drag a csv file below and let me do the math</h4>
      </div>
    );
  }
}

export default AppHeader;
