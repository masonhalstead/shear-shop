import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class JobsPage extends PureComponent {
  render() {
    return <p>JOBS PAGE</p>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobsPage);
