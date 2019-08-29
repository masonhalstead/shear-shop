import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class ProjectsPage extends PureComponent {
  render() {
    return <p>PROJECTS PAGE</p>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
