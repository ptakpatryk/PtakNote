import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridTemplate from 'templates/GridTemplate';
import Card from 'components/Molecules/Card/Card';
import Heading from 'components/atoms/Heading/Heading';
import { cutString } from 'shared/utility';
import Modal from 'components/Organisms/Modal/Modal';

const Notes = ({ notes, filterValue, error }) => {
  return (
    <GridTemplate>
      <>
        <Modal show={error}>Something went wrong!</Modal>
        {notes.length === 0 ? (
          <Heading>No notes to show.</Heading>
        ) : (
          notes
            .filter((el) => el.title.toLowerCase().includes(filterValue))
            .map((el) => (
              <Card
                id={el.id}
                key={el.id}
                title={el.title}
                content={cutString(el.content, 15)}
                created={el.created}
                cardType="notes"
              />
            ))
        )}
      </>
    </GridTemplate>
  );
};

Notes.propTypes = {
  notes: PropTypes.instanceOf(Array).isRequired,
  filterValue: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Object),
};

Notes.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => {
  return {
    notes: state.app.notes,
    filterValue: state.app.filterValue,
    error: state.app.error,
  };
};

export default connect(mapStateToProps)(Notes);
