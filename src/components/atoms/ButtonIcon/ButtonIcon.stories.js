import React from 'react';
import styled from 'styled-components';

// Icons imports
import bulbIcon from 'assets/icons/bulb.svg';
import logoutIcon from 'assets/icons/logout.svg';
import penIcon from 'assets/icons/pen.svg';
import plusIcon from 'assets/icons/plus.svg';
import twitterIcon from 'assets/icons/twitter.svg';

// Component import
import ButtonIcon from './ButtonIcon';

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.note};
`;

export default {
  title: 'Atoms/Button Icon',
  decorators: [(storyFn) => <YellowBackground>{storyFn()}</YellowBackground>],
};

export const Bulb = () => <ButtonIcon icon={bulbIcon} />;
export const BulbActive = () => <ButtonIcon active icon={bulbIcon} />;
export const Logout = () => <ButtonIcon icon={logoutIcon} />;
export const Pen = () => <ButtonIcon icon={penIcon} />;
export const Plus = () => <ButtonIcon icon={plusIcon} />;
export const Twitter = () => <ButtonIcon icon={twitterIcon} />;
