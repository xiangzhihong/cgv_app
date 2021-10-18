import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import DefaultTheme from '../../theme/defaultTheme'

const { blue, textInactiveColor, border } = DefaultTheme.colors

const ButtonListFooter = ({ content = '查看更多', transparent = false, style, onPress = () => { }, disabled, iconName = 'right', color }) => (
  <TouchableOpacity style={[styles.btn, { backgroundColor: transparent ? 'transparent' : '#fff' }, style]} onPress={onPress} disabled={disabled} >
    <Text style={[styles.text, { color: color || (transparent ? blue : textInactiveColor) }]}>{content}</Text>
    <AntDesign name={iconName} color={color || (transparent ? blue : textInactiveColor)} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.4,
    borderColor: border,
  },
  text: {
    fontSize: 15,
  },
})

export default ButtonListFooter
