/* @flow */

import React from 'react';

import { Header, Inner, TitleLink, SnsList, Item, SnsLink, Ico } from './styles';

export default function HeaderComponent() {
  const snsList = [
    {
      id: 1,
      url: 'https://github.com/yuyake0084/anicheck',
      ico: 'github',
    },
    {
      id: 2,
      url: 'https://twitter.com/yuyake0084LL',
      ico: 'twitter',
    },
  ];
  const items = snsList.map(item => (
    <Item key={item.id}>
      <SnsLink href={item.url} target="_blank">
        <Ico className={`fab fa-${item.ico}`} />
      </SnsLink>
    </Item>
  ));

  return (
    <Header>
      <Inner>
        <div />
        <TitleLink to="/">AniChck</TitleLink>
        <SnsList>{items}</SnsList>
      </Inner>
    </Header>
  );
}
