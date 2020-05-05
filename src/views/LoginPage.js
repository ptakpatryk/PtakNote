import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';

// Authenticate
import { auth } from 'store/actions/';
import { connect } from 'react-redux';

// UI IMPORTS
import logo from 'assets/logo.svg';
import Spinner from 'components/atoms/Spinner/Spinner';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const Wrapper = styled.div`
  /* background-color: ${({ theme }) => theme.notes}; */
  background-color: ${({ theme }) => theme.notes};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 45vw;
  max-width: 450px;
  border-radius: 10px;
  box-shadow: 0 20px 25px -20px rgba(0, 0, 0, 0.5);
  background-color: white;
  padding: 50px;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.small}) {
    min-width: 400px;
  }

  @media (max-width: ${({ theme }) => theme.small}) {
    width: 90vw;
    padding: 50px 30px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: 150px;
  margin-bottom: 20px;

  @media (max-width: ${({ theme }) => theme.small}) {
    width: 150px;
    height: 100px;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  color: black;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
`;

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 25px;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};

  @media (max-width: ${({ theme }) => theme.small}) {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledErrorParagraph = styled(Paragraph)`
  color: red;
  margin-bottom: 20px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Login = ({ onAuth, isLoading, error }) => {
  const [onLoginPage, setOnLoginPage] = useState(true);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    // Depends on route will show login or register form
    if (currentPath === '/register') {
      setOnLoginPage(false);
    }
  }, [currentPath]);

  const formContent = (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={({ email, password }) => {
        onAuth(email, password, onLoginPage);
      }}
    >
      {() => (
        <StyledForm>
          <StyledParagraph>{onLoginPage ? 'Sign In' : 'Sign Up'}</StyledParagraph>
          <StyledInput as={Field} name="email" type="email" placeholder="E-mail" />
          <StyledInput as={Field} name="password" type="password" placeholder="Password" />
          <Button type="submit" pagetype="notes">
            {onLoginPage ? 'Sign In' : 'Sign Up'}
          </Button>
          <StyledLink
            onClick={() => setOnLoginPage(!onLoginPage)}
            to={onLoginPage ? 'register' : 'login'}
          >
            {onLoginPage ? 'I WANT TO SIGN UP' : 'Already have an account? Sign In!'}
          </StyledLink>
        </StyledForm>
      )}
    </Formik>
  );

  return (
    <Wrapper>
      <StyledLogo src={logo} />
      <StyledParagraph>Your favorite note taking app</StyledParagraph>
      <StyledWrapper>
        {error ? <StyledErrorParagraph>{error}</StyledErrorParagraph> : null}
        {isLoading ? <Spinner /> : formContent}
      </StyledWrapper>
    </Wrapper>
  );
};

Login.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, onLoginPage) => dispatch(auth(email, password, onLoginPage)),
});

const mapStateToProps = (state) => ({
  error: state.auth.errorMsg,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
