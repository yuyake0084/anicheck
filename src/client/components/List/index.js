/* @flow */

import React from 'react';

import { Ico } from '@client/components';
import {
  List,
  Item,
  Link,
  Overlay,
  OverlayText,
  Thumb,
  Content,
  Title,
  Bottom,
  IcoBox,
} from './styles';

type Props = {
  dataArray: Array<Object>,
  favorites: Array<number>,
  handleClickLike: (e: SyntheticEvent<HTMLDivElement>, animeId: number) => void,
};

export default function ListComponent(props: Props) {
  const { dataArray, favorites, handleClickLike } = props;
  const items = dataArray.map(item => (
    <Item key={item.id}>
      <Link href={item.public_url} target="_blank">
        <Thumb src="https://placehold.jp/350x120.png" />
        <Overlay>
          <OverlayText>公式サイトへ</OverlayText>
        </Overlay>
      </Link>
      <Content>
        <Title>{item.title}</Title>
        <Bottom>
          <IcoBox
            isFavorited={favorites.includes(item.id)}
            onClick={e => handleClickLike(e, item.id)}
          >
            <Ico ico="heart" size={16} />
          </IcoBox>
        </Bottom>
      </Content>
    </Item>
  ));

  return <List>{items}</List>;
}
