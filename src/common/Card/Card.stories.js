import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Card from './Card';
import Text from '../Text/Text';
import {ThemeProvider, lightTheme as theme} from '../../theme';

storiesOf('Card', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('outline', () => (
    <Card type="outline">
      <Text>This is a outline Card with Text component inside</Text>
    </Card>
  ))
  .add('clear', () => (
    <Card type="clear">
      <Text>This is a clear Card with Text component inside</Text>
    </Card>
  ))
  .add('shadow', () => (
    <Card type="shadow">
      <Text>This is a shadow Card with Text component inside</Text>
    </Card>
  ));
