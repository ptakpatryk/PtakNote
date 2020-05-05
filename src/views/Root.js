import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import { routes } from 'routes/index';
import { autoCheckAuth, fetchItems } from 'store/actions';

// Views IMPORTS
import Twitters from 'views/Twitters';
import Notes from 'views/Notes';
import Articles from 'views/Articles';
import DetailsPage from 'views/DetailsPage';
import LoginPage from 'views/LoginPage';

const Root = ({ isAuthenticated, onAutoCheckAuth, onFetchItems, token, userId }) => {
  let rootContent = null;

  useEffect(() => {
    onAutoCheckAuth();
  }, [onAutoCheckAuth]);

  useEffect(() => {
    if (token) {
      onFetchItems(token, userId);
    }
  }, [onFetchItems, token, userId]);

  if (isAuthenticated) {
    rootContent = (
      <Switch>
        <Route path={routes.home} exact render={() => <Redirect to="/notes" />} />
        <Route path={routes.note} component={DetailsPage} />
        <Route path={routes.notes} component={Notes} />
        <Route path={routes.twitter} component={DetailsPage} />
        <Route path={routes.twitters} component={Twitters} />
        <Route path={routes.article} component={DetailsPage} />
        <Route path={routes.articles} component={Articles} />
        <Redirect to="/" />
      </Switch>
    );
  } else if (!isAuthenticated) {
    rootContent = (
      <Switch>
        <Route path={routes.login} component={LoginPage} />
        <Route path={routes.register} component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return <MainTemplate>{rootContent}</MainTemplate>;
};

// const Root = ({ isAuthenticated, onAutoCheckAuth, onFetchItems, token, userId }) => {
Root.propTypes = {
  isAuthenticated: PropTypes.bool,
  onAutoCheckAuth: PropTypes.func.isRequired,
  onFetchItems: PropTypes.func.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string,
};

Root.defaultProps = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
  token: state.auth.idToken,
  userId: state.auth.userId,
  items: state.app.twitters,
});

const mapDispatchToProps = (dispatch) => ({
  onAutoCheckAuth: () => dispatch(autoCheckAuth()),
  onFetchItems: (token, userId) => dispatch(fetchItems(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
