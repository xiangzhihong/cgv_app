import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import TicketSummaryItem from './TicketSummaryItem';
import { ThemeProvider, lightTheme as theme } from '../../../../theme';

const tickets = [
  {seatNo: "9排05座", basePrice: 40},
  {seatNo: "9排05座", basePrice: 40},
  {seatNo: "9排05座", basePrice: 40},
  {seatNo: "9排05座", basePrice: 40},
  {seatNo: "9排05座", basePrice: 40},
  {seatNo: "9排05座", basePrice: 40}
];

storiesOf('TicketSummaryItem', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('info', () => (
    <View>
    <TicketSummaryItem 
      title='误杀'
      baseUrl=''
      imgUrl=''
      schedule='今天 1月25日 12:00'
      movieFormat='中文/2D'
      cinema='上海安亭'
      screen='激光3厅(大)'
      seats={tickets}
      totalCount={6}
      totalAmount={240} 
    />
    </View>
  ));
