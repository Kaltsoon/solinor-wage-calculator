import React from 'react';
import { connect } from 'react-redux';

function renderHeadings() {
  return (
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Wage ($)</th>
      <th>Evening hours</th>
      <th>Total hours</th>
      <th>Month and year</th>
    </tr>
  );
}

class WagesTable extends React.Component {
  renderRows() {
    return this.props.wages.map(row => (
      <tr key={`${row.personId}-${row.date}`}>
        <td>{row.personId}</td>
        <td>{row.personName}</td>
        <td>{row.wage}$</td>
        <td>{row.eveningHours}</td>
        <td>{row.totalHours}</td>
        <td>{row.date}</td>
      </tr>
    ));
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          {renderHeadings()}
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

WagesTable.propTypes = {
  wages: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      personId: React.PropTypes.string,
      personName: React.PropTypes.string,
      date: React.PropTypes.string,
      wage: React.PropTypes.number,
      eveningHours: React.PropTypes.number,
      totalHours: React.PropTypes.number,
    }),
  ),
};

const mapStateToProps = state => ({
  wages: state.wagesTable.wages,
});

export default connect(
  mapStateToProps,
)(WagesTable);
