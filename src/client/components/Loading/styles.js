/* @flow */

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.p`
  ${({ outerSize, borderSize, color }) => `
    width: ${outerSize}px;
    height: ${outerSize}px;
    border: ${borderSize}px solid transparent;
    border-top-color: ${color};
    border-radius: 100%;
    animation: ${rotate} 0.5s linear infinite;
    box-sizing: border-box;
  `};
`;
