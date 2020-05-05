/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PageContext from 'context/context';

const withContext = (Component) =>
  function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {(context) => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    );
  };

export default withContext;
