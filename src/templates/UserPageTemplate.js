import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sidebar from 'components/Organisms/Sidebar/Sidebar';

const UserPageWrapper = styled.div`
  padding-left: 150px;

  @media (max-width: ${({ theme }) => theme.small}) {
    padding-left: 0;
  }
`;

const userPageTemplate = ({ children }) => (
  <UserPageWrapper>
    <Sidebar />
    {children}
  </UserPageWrapper>
);

userPageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default userPageTemplate;
