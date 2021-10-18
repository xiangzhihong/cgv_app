import React from 'react'
import {
  View,
} from 'react-native'

const Holder = ({ width, height, style }) => <View style={[{ width, height }, style]} />

export default Holder
