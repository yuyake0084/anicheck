/* @flow */

import * as React from 'react';

import { Wrap } from './styles';

type Props = {
  text: string,
};

export default function Error(props: Props) {
  return <Wrap {...props} />;
}
