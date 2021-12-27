import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NoticeView, { NoticeItem } from './index';

const notice = [
  {id: 1, description: '1. Notice Item 1'},
  {id: 2, description: '2. Notice Item 2'},
  {id: 3, description: '3. Notice Item 3'},
  {id: 4, description: '4. Notice Item 4'},
  {id: 5, description: '5. Notice Item 5'}
];

storiesOf('NoticeView', module)
  .add('default with Height = 40', () => (
    <NoticeView
      notices={notice}
      direction="down"
    />
  ));
