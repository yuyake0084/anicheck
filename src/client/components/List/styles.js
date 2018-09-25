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
  overflow: hidden;
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

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  content: '公式サイトへ';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  background-image: linear-gradient(135deg, ${colors.conversion}, ${colors.blue});
  opacity: 0;
`;

export const OverlayText = styled.p`
  position: relative;
  padding: 12px 34px;
  color: #fff;
  font-size: 14px;
  border: 2px solid #fff;
`;

export const Link = styled.a`
  position: relative;
  display: block;
  overflow: hidden;

  &:hover {
    & > ${Overlay} {
      opacity: 0.8;
    }
  }
`;

export const Thumb = styled.img`
  width: 100%;
  border-radius: 6px 6px 0 0;
`;

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
  cursor: pointer;
  border: 1px solid ${colors.border};
  transition: all 0.3s;
  border-radius: 50%;

  ${({ isFavorited }) => `
    color: ${isFavorited ? '#fff' : colors.red};
    background-color: ${isFavorited ? colors.red : '#fff'};
  `};

  &:hover {
    color: #fff;
    background-color: ${colors.red};
  }
`;
