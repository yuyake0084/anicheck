/* @flow */

import React from 'react';

import { colors } from '@client/theme/constants';
import { Wrap, Circle } from './styles';

type Props = {
  outerSize?: number,
  borderSize?: number,
  color?: string,
};

export default function Loading(props: Props) {
  const { outerSize, borderSize, color } = props;

  return (
    <Wrap>
      <Circle outerSize={outerSize} borderSize={borderSize} color={color} />
    </Wrap>
  );
}

Loading.defaultProps = {
  outerSize: 70,
  borderSize: 4,
  color: colors.conversion,
};
