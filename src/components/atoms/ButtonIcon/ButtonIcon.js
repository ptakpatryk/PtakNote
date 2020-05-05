// ButtonIcon component
import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  width: 57px;
  height: 57px;
  border-radius: 20px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 40%;
  border: none;
  background-color: transparent;
  outline: none;
  margin: 5px;
  &.active,
  :focus {
    background-color: white;
  }

  @media (max-width: ${({ theme }) => theme.small}) {
    width: 45px;
    height: 45px;
    /* margin: 0 5px; */
  }
`;

export default ButtonIcon;
