/* @flow */

import React from 'react';
import moment from 'moment';

import { Footer, CopyRight } from './styles';

export default function FooterComponent() {
  return (
    <Footer>
      <CopyRight>
        {`Copyright © @${moment().format('YYYY')} yuyake0084 All Rights Reserved.`}
      </CopyRight>
    </Footer>
  );
}
