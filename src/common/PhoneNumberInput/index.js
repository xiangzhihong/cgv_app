import React from 'react'
import { Text, View, TextInput, StyleSheet, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PhoneNumberInput = ({ tip, onChangeText }) => {
  return (
    <View style={styles.inputLayer}>
      <View style={styles.textInputView}>
        <Text style={styles.input86}>+86</Text>
        <AntDesign name="right"/>
        <TextInput style={styles.input} maxLength={11} placeholder="请输入手机号码" keyboardType="phone-pad" onChangeText={onChangeText}/>
      </View>
      <Text style={styles.inputTip}>{tip}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  inputLayer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
  },
  textInputView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  input86: {
    fontSize: 15,
    color: '#222',
    fontFamily: Platform.OS === 'ios' ? null : ''
  },
  inputTip: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    color: '#999',
  },
})

export default PhoneNumberInput
