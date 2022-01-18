import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  ShopingCartScreen,
} from '../../screens'

const ModalStack = createStackNavigator()

export default function ModalsScreen() {
  return (
    <ModalStack.Navigator headerMode='none'  >
      <ModalStack.Screen name='ShopingCartScreen' component={ShopingCartScreen}/>
    </ModalStack.Navigator>
  )
}
