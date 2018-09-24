/* @flow */

import React from 'react';

import { Ico } from '@client/components';
import { List, Item, Link, Thumb, Content, Title, Bottom, IcoBox } from './styles';

type Props = {
  dataArray: Array<Object>,
};

export default function ListComponent(props: Props) {
  const { dataArray } = props;
  const items = dataArray.map(item => (
    <Item key={item.id}>
      <Link href={item.public_url} target="_blank">
        <Thumb />
        <Content>
          <Title>{item.title}</Title>
          <Bottom>
            <IcoBox>
              <Ico ico="heart" size={16} />
            </IcoBox>
          </Bottom>
        </Content>
      </Link>
    </Item>
  ));

  return <List>{items}</List>;
}
