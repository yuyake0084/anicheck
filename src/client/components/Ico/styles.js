/* @flow */

import styled from 'styled-components';

export const Ico = styled.figure`
  display: inline-block;

  ${({ size }) => `
    & > i {
      font-size: ${size}px;
    }
  `};
`;

export default { Ico };
