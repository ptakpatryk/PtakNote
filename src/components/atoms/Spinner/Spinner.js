import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const motion = () => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DualRingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(p) => `${p.width}${p.sizeUnit}`};
  height: ${(p) => `${p.height}${p.sizeUnit}`};
  :after {
    content: ' ';
    display: block;
    width: ${(p) => `${p.size}${p.sizeUnit}`};
    height: ${(p) => `${p.size}${p.sizeUnit}`};
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.notes};
    border-color: ${({ theme }) => theme.notes} transparent ${({ theme }) => theme.notes}
      transparent;
    animation: ${(p) => motion(p)} 1.2s linear infinite;
  }
`;

const Spinner = ({ color, size, sizeUnit, width, height }) => (
  <DualRingSpinner color={color} size={size} sizeUnit={sizeUnit} width={width} height={height} />
);

Spinner.propTypes = {
  color: PropTypes.string,
  sizeUnit: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
};

Spinner.defaultProps = {
  width: 64,
  height: 64,
  size: 46,
  color: '#00bfff',
  sizeUnit: 'px',
};

export default Spinner;
