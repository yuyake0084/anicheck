/* @flow */

import styled from 'styled-components';

import { colors } from '@client/styles/constants';

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &::after {
    display: block;
    content: '';
    width: 32%;
  }
`;

export const Item = styled.li`
  width: 32%;
  margin-top: 2%;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #fff;
  border-radius: 6px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:nth-child(-n + 3) {
    margin-top: 0;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const Link = styled.a`
  display: block;
`;

export const Thumb = styled.img``;

export const Content = styled.div`
  padding: 10px;
`;

export const Title = styled.h3`
  color: ${colors.text};
  font-size: 12px;
  font-weight: bold;
`;

export const Bottom = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export const IcoBox = styled.div`
  display: inline-block;
  padding: 10px;
  color: ${colors.red};
  border: 1px solid ${colors.border};
  transition: all 0.3s;
  border-radius: 50%;

  &:hover {
    color: #fff;
    background-color: ${colors.red};
  }
`;
