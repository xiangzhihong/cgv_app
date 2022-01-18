import React from 'react'
import { Text, View } from 'react-native'

export default () => {
  return (
      <View
          style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#fff',
          }}>
          <Text>对不起，服务器出了一点问题</Text>
      </View>
  )
}
