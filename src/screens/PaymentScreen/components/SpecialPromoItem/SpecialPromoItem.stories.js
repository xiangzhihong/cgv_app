import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import SpecialPromoItem from './SpecialPromoItem';
import { ThemeProvider, lightTheme as theme } from '../../../../theme';

const discountByPromotions = [
  {
    promoId: 1,
    promoName: '特惠活动1',
    promoUseSeatNo: '123',
    discountAmount: -100
  }
];

storiesOf('SpcecialPromoItem', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('info', () => (
    <View>
      <SpecialPromoItem items={discountByPromotions} />
    </View>
  ));
