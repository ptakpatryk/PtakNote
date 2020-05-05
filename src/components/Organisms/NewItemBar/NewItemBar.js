import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { addItem } from 'store/actions';
import withContext from 'hoc/withContext';

// UI IMPORTS
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';

const StyledWrapper = styled.div`
  z-index: 99;
  position: fixed;
  display: flex;
  padding: 80px 50px;
  flex-direction: column;
  right: 0;
  height: 100vh;
  width: 650px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translateX(${({ isVisible }) => (isVisible ? '0' : '120%')});
  transition: transform 0.6s ease-in-out;

  @media (max-width: ${({ theme }) => theme.medium}) {
    width: 70vw;
  }

  @media (min-width: ${({ theme }) => theme.small}) {
    top: 0;
    border-left: 5px solid ${({ theme, activeColor }) => theme[activeColor]};
  }

  @media (max-width: ${({ theme }) => theme.small}) {
    top: none;
    width: 100vw;
    height: 70vh;
    bottom: 0;
    overflow: scroll;
    border-top: 5px solid ${({ theme, activeColor }) => theme[activeColor]};
    padding: 30px 20px;
  }
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 60px;
  width: 100%;
  border-radius: 20px;
  height: 30vh;

  @media (max-width: ${({ theme }) => theme.small}) {
    height: 100px;
  }
`;

const StyledInput = styled(Input)`
  display: block;
  width: 100%;
  margin-top: 30px;
`;

function checkLatinValidity(value) {
  const nonLatinRegex = /[a-zA-Z]*[^A-Za-z \d\w]+[a-zA-Z]*/g;
  // If true - contain latin character (so it's reversed)
  return !nonLatinRegex.test(value);
}

const NewItemBar = ({ pageContext, isVisible, onAddItem, setIsVisible, token, userId }) => (
  <StyledWrapper activeColor={pageContext} isVisible={isVisible}>
    <Heading big>Create new {pageContext}</Heading>
    <Formik
      initialValues={{ title: '', content: '', articleUrl: '', twitterName: '', created: '' }}
      onSubmit={(values) => {
        if (checkLatinValidity(values.twitterName)) {
          // eslint-disable-next-line no-param-reassign
          values.userId = userId;
          onAddItem(token, pageContext, values);
          setIsVisible(false);
        }
      }}
    >
      {({ isSubmiting }) => (
        <Form>
          <StyledInput as={Field} type="text" name="title" placeholder="Title" maxLength="25" />
          {pageContext === 'twitters' && (
            <StyledInput as={Field} placeholder="Twitter name" type="text" name="twitterName" />
          )}
          {pageContext === 'articles' && (
            <StyledInput as={Field} placeholder="link" type="text" name="articleUrl" />
          )}
          <StyledTextArea
            as={Field}
            component="textarea"
            name="content"
            placeholder="Your content..."
          />
          <Button type="submit" pagetype={pageContext} disabled={isSubmiting}>
            Add Note
          </Button>
        </Form>
      )}
    </Formik>
  </StyledWrapper>
);

// const NewItemBar = ({ pageContext, isVisible, onAddItem, setIsVisible, token, userId }) => (

NewItemBar.propTypes = {
  pageContext: PropTypes.string,
  isVisible: PropTypes.bool,
  onAddItem: PropTypes.func.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

NewItemBar.defaultProps = {
  isVisible: false,
  pageContext: 'notes',
};

const mapStateToProps = (state) => ({
  token: state.auth.idToken,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddItem: (token, itemType, itemContent) => dispatch(addItem(token, itemType, itemContent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withContext(NewItemBar));
