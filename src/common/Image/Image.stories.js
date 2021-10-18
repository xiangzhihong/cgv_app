import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Image from './Image';
import { ThemeProvider, lightTheme as theme } from '../../theme';
import { View } from 'react-native';

storiesOf('Image', module)
  .addDecorator(getStory => (
    <ThemeProvider theme={theme}>{getStory()}</ThemeProvider>
  ))
  .add('default', () => (
    <View style={{ width: 100, height: 100 }}>
      <Image

        source={{
          uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
        }}
        resizeMode="cover"
      />
    </View>
    
  ));