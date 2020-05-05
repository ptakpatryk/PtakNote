import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearError } from 'store/actions';

// UI Imports
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledBackDrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StyledWrapper = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  width: 30vw;
  border-top: 3px solid red;
  border-bottom: 3px solid red;
  z-index: 1111;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 30px 0;
`;

const Modal = ({ show, onCloseHandler, children }) =>
  show ? (
    <StyledBackDrop onClick={onCloseHandler}>
      <StyledWrapper>
        <Heading>An error has occurred.</Heading>
        <StyledParagraph>{children}</StyledParagraph>
        <Button secondary>Close</Button>
      </StyledWrapper>
    </StyledBackDrop>
  ) : null;

Modal.propTypes = {
  show: PropTypes.instanceOf(Object),
  onCloseHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  show: false,
};

const mapDispatchToProps = (dispatch) => ({
  onCloseHandler: () => dispatch(clearError()),
});

export default connect(null, mapDispatchToProps)(Modal);
