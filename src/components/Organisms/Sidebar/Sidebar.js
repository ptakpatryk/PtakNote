import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { logout } from 'store/actions/';
import { NavLink, Link } from 'react-router-dom';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

// Icons imports
import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import twitterIcon from 'assets/icons/twitter.svg';

// Logo import
import logo from 'assets/logo.svg';

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 150px;
  height: 100vh;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.note)};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px 30px;
  z-index: 999;

  @media (max-width: ${({ theme }) => theme.small}) {
    flex-direction: row;
    justify-content: center;
    width: 100vw;
    height: 80px;
    padding: 10px 20px;
  }
`;

const StyledIconWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.small}) {
    flex-direction: row;
    margin: 0 0 0 auto;
  }
`;

const StyledLogo = styled.div`
  width: 70px;
  height: 50px;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 100px;

  @media (max-width: ${({ theme }) => theme.small}) {
    margin: 0;
  }
`;

const LogoutButton = styled(ButtonIcon)`
  margin-top: auto;

  @media (max-width: ${({ theme }) => theme.small}) {
    margin: 0 0 0 auto;
    background-size: 50%;
  }
`;

const Sidebar = ({ pageContext, onLogout }) => (
  <StyledWrapper activeColor={pageContext}>
    <StyledLogo as={Link} to="/notes" />
    <StyledIconWrapper>
      <ButtonIcon as={NavLink} to="/notes" activeclass="active" icon={penIcon} />
      <ButtonIcon as={NavLink} to="/twitters" activeclass="active" icon={twitterIcon} />
      <ButtonIcon as={NavLink} to="/articles" activeclass="active" icon={bulbIcon} />
    </StyledIconWrapper>
    <LogoutButton onClick={onLogout} activeclass="active" icon={logoutIcon} />
  </StyledWrapper>
);

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  onLogout: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  pageContext: 'notes',
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(withContext(Sidebar));
