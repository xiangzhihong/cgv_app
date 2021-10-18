import React from 'react'
import { View,Text,Image } from 'react-native'
import Artboard from '../../assets/images/welcome/Artboard.png'

export default ({ style, title = '当前页面无内容~' }) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Image source={Artboard} style={{ width: 93, height: 175 }} />
      <Text type="label" style={{ marginTop: 8, textAlign: 'center' }}>{title}</Text>
    </View>
  )
}
