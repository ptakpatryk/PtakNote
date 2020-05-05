import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/Molecules/Card/Card';
import Heading from 'components/atoms/Heading/Heading';
import { cutString } from 'shared/utility';
import Modal from 'components/Organisms/Modal/Modal';

const Twitters = ({ twitters, filterValue, error }) => {
  return (
    <GridTemplate>
      <>
        <Modal show={error}>Something went wrong!</Modal>

        {twitters.length === 0 ? (
          <Heading>No twitters to show.</Heading>
        ) : (
          twitters
            .filter((el) => el.title.toLowerCase().includes(filterValue))
            .map((el) => (
              <Card
                id={el.id}
                key={el.id}
                title={el.title}
                content={cutString(el.content, 15)}
                created={el.created}
                twitterName={el.twitterName}
                cardType="twitters"
              />
            ))
        )}
      </>
    </GridTemplate>
  );
};

Twitters.propTypes = {
  twitters: PropTypes.instanceOf(Array).isRequired,
  filterValue: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Object),
};

Twitters.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  return {
    twitters: state.app.twitters,
    filterValue: state.app.filterValue,
    error: state.app.error,
  };
};

export default connect(mapStateToProps)(Twitters);
