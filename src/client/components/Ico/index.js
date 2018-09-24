/* @flow */

import React from 'react';

import { Ico } from './styles';

type Props = {
  ico: string,
  size?: number,
};

export default function IcoComponent(props: Props) {
  const { ico, size } = props;

  return (
    <Ico size={size}>
      <i className={`fas fa-${ico}`} />
    </Ico>
  );
}

IcoComponent.defaultProps = {
  size: 20,
};
