/* @flow */

import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { colors, size } from '@client/styles/constants';

export const Header = styled.header`
  padding: 20px 0;
  text-align: center;
  background-color: ${colors.conversion};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Inner = styled.div`
  position: relative;
  width: 100%;
  max-width: ${size.inner}px;
  margin: 0 auto;
`;

export const TitleLink = styled(RouterLink)`
  color: #fff;
  font-size: 20px;
`;

export const SnsList = styled.ul`
  position: absolute;
  top: calc(50% - (30px / 2));
  right: 0;
  display: flex;
`;

export const Item = styled.li`
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
`;

export const SnsLink = styled.a`
  display: block;
  color: #fff;
`;

export const Ico = styled.i`
  font-size: 30px;
`;
