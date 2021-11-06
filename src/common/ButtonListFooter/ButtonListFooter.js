import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'


const ButtonListFooter = ({ content = '查看更多', transparent = false, style, onPress = () => { }, disabled, iconName = 'right', color }) => (
  <TouchableOpacity style={[styles.btn, { backgroundColor: transparent ? 'transparent' : '#fff' }, style]} onPress={onPress} disabled={disabled} >
    <Text style={[styles.text, { color: color || (transparent ? '#389AFC' : '#999999') }]}>{content}</Text>
    <AntDesign name={iconName} color={color || (transparent ? '#389AFC' : '#999999')} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#e5e5e5',
  },
  text: {
    fontSize: 15,
  },
})

export default ButtonListFooter
