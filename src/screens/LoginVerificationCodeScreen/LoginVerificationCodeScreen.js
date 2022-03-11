import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, Keyboard, StyleSheet } from 'react-native'
import LoginLogo from '../../common/LoginLogo/LoginLogo'
import { tools } from '../../utils'
import AntDesign from "react-native-vector-icons/AntDesign";


const InputBox = ({ value, isFocused }) => (
  <View
    style={[styles.inputBox, isFocused && { borderColor: '#FC5869' }]}>
    <Text style={styles.inputBoxText}>{value}</Text>
  </View>
)

const LoginVerificationCodeScreen = ({ navigation, route, signInSuccess: _signInSuccess }) => {

  const { phoneNumber} = route.params || {}
  let timer
  let surplus = 60
  const [timeLeft, setTimeLeft] = useState(60)
  const [inputStr, setInputStr] = useState('')

  useEffect(() => {
    startCountDown()
    return clearTimer
  }, [])
  const onChangeText = text => {
    if (text.length <= 6) {
      setInputStr(text)
    }
  }

  useEffect(() => {
    if (inputStr.length === 6) {
      login()
    }
  }, [inputStr])

  const login = async () => {
    tools.Toast.toast('登录成功', 1)
    navigation.goBack()
  }

  const clearTimer = () => timer && clearInterval(timer)

  const startCountDown = () => {
    clearTimer()
    timer = setInterval(() => {
      setTimeLeft(surplus -= 1)
      if (surplus <= 0) {
        clearTimer()
      }
    }, 1000)
  }

  const getVerificationCode = async () => {
    surplus = 60
    startCountDown()
  }

  function renderClose() {
    return (<TouchableOpacity onPress={navigation.goBack} style={styles.close}>
      <AntDesign name="close" color={'#222'} size={20} style={styles.closeBtn}/>
    </TouchableOpacity>);
  }

  return (
    <View style={styles.contain}>
      {renderClose()}
      <View style={styles.main}>
        <LoginLogo style={styles.logLayer} />
        <Text style={styles.phoneNum}>
          验证码已发送至+86 {phoneNumber}
        </Text>
        <View style={styles.inputBoxLayer}>
          <InputBox value={inputStr[0]} isFocused={inputStr.length === 0} />
          <InputBox value={inputStr[1]} isFocused={inputStr.length === 1} />
          <InputBox value={inputStr[2]} isFocused={inputStr.length === 2} />
          <InputBox value={inputStr[3]} isFocused={inputStr.length === 3} />
          <InputBox value={inputStr[4]} isFocused={inputStr.length === 4} />
          <InputBox value={inputStr[5]} isFocused={inputStr.length === 5} />
          <TextInput
            style={styles.inputStyle}
            onChangeText={onChangeText}
            value={inputStr}
            underlineColorAndroid="transparent"
            onSubmitEditing={Keyboard.dismiss}
            caretHidden
            autoFocus
            maxLength={6}
            keyboardType="numeric"
            selectionColor="transparent"
          />
        </View>
        {!timeLeft ? (
          <TouchableOpacity onPress={getVerificationCode}>
            <Text style={styles.link}>未收到验证码,重新获取</Text>
          </TouchableOpacity>
        ) : (
            <Text style={styles.timeLeft}>
              {timeLeft}秒后重新获取验证码
            </Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contain: {
    backgroundColor:'#fff',
  },
  main: {
    justifyContent: 'center',
    marginBottom: 300,
  },
  close: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logLayer: {
    marginBottom: 0,
  },
  phoneNum: {
    fontSize: 15,
    marginTop: 48,
    marginLeft: 20,
    color: '#222',
  },
  link: {
    fontSize: 13,
    marginLeft: 20,
    color: '#389AFC',
  },
  timeLeft: {
    fontSize: 13,
    marginLeft: 20,
    color: '#999',
  },
  inputStyle: {
    color: 'transparent',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  inputBox: {
    height: 48,
    width: 48,
    alignSelf: 'center',
    borderWidth: 2,
    justifyContent: 'center',
    borderColor: '#EEE',
  },
  inputBoxText: {
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputBoxLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
  },
})

export default LoginVerificationCodeScreen;
