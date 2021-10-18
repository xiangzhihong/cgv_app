import * as React from 'react';
import {InitialState, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackScreen from './MainStackScreen';
import {navigationRef} from '../utils';
import {LightTheme} from '../theme';

const RootStack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef} theme={LightTheme}>
      <RootStack.Navigator mode="modal" initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
