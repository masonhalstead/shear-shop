import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLoading } from 'ducks/actions';
import cn from './NotFound.module.scss';
const { PUBLIC_URL } = process.env;

class ConnectedNotFound extends React.PureComponent {
  static propTypes = {
    setLoadingAction: PropTypes.func,
  };

  componentDidMount() {
    const { setLoadingAction } = this.props;
    setLoadingAction(false);
  }

  render() {
    return (
      <div className={cn.notFoundWrapper}>
        <img
          src={`${PUBLIC_URL}/404.png`}
          alt="Cognitiv 404 Error"
          height={300}
        />
        <div className={cn.notFoundContainer}>
          <h1>404</h1>
          <p>
            Oops, looks like you are stranded!
          </p>
          <p>
            The page you are trying to access doesnt exist. Please navigate your
            way back to a working page.
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setLoadingAction: setLoading,
};

export const NotFound = connect(
  null,
  mapDispatchToProps,
)(ConnectedNotFound);
