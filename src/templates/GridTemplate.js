import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterData } from 'store/actions';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import UserPageTemplate from 'templates/UserPageTemplate';

// UI IMPORTS
import NewItemBar from 'components/Organisms/NewItemBar/NewItemBar';
import plusIcon from 'assets/icons/plus.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Input from 'components/atoms/Input/Input';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  padding: 25px 80px 25px 70px;

  @media (max-width: ${({ theme }) => theme.big}) {
    padding-right: 50px;
  }

  @media (max-width: ${({ theme }) => theme.small}) {
    padding: 100px 25px;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${({ theme }) => theme.big}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.medium}) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 0;
`;

const StyledParagraph = styled(Paragraph)`
  margin: 0;
  font-weight: ${({ theme }) => theme.light};
`;

const StyledButtonIcon = styled(ButtonIcon)`
  z-index: 100;
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ activeColor, theme }) => theme[activeColor]};
  border-radius: 50px;
  outline: none;
  transition: transform 0.25s ease-in-out;
  ${({ isVisible }) => isVisible && 'transform: rotate(45deg);'}

  :focus {
    background-color: ${({ activeColor, theme }) => theme[activeColor]};
  }
`;

const GridTemplate = ({ children, pageContext, onPassFilterValue, itemsQuantity }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onPassFilterValue(enteredFilter.toLowerCase());
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, onPassFilterValue]);

  return (
    <UserPageTemplate>
      <StyledWrapper>
        <StyledPageHeader>
          <Input
            search
            placeholder="Search"
            onChange={(e) => {
              setEnteredFilter(e.target.value);
            }}
          />
          <StyledHeading big as="h1">
            {pageContext}
          </StyledHeading>
          <StyledParagraph>
            {itemsQuantity[pageContext]} {pageContext}
          </StyledParagraph>
        </StyledPageHeader>
        <StyledGrid>{children}</StyledGrid>
        <StyledButtonIcon
          icon={plusIcon}
          activeColor={pageContext}
          isVisible={isVisible}
          onClick={() => setIsVisible(!isVisible)}
        />
        <NewItemBar isVisible={isVisible} setIsVisible={setIsVisible} />
      </StyledWrapper>
    </UserPageTemplate>
  );
};

// const GridTemplate = ({ children, pageContext, onPassFilterValue, itemsQuantity }) => {

GridTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  pageContext: PropTypes.oneOf(['notes', 'articles', 'twitters']),
  onPassFilterValue: PropTypes.func.isRequired,
  itemsQuantity: PropTypes.instanceOf(Object).isRequired,
};

GridTemplate.defaultProps = {
  pageContext: 'notes',
};

const mapStateToProps = (state) => ({
  itemsQuantity: state.app.itemsQuantity,
});

const mapDispatchToProps = (dispatch) => ({
  onPassFilterValue: (enteredFilter, pageType) => dispatch(filterData(enteredFilter, pageType)),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(GridTemplate));
