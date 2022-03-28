import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import { WebView } from 'react-native-webview'

const { width, height } = Dimensions.get('window')

const PromotionWebviewScreen = ({ route }) => {
  const {serviceUrl} = route.params || {}
  console.log(serviceUrl)
  return (
    <View style={styles.bg}>
      <WebView
        style={styles.web} source={{ uri: serviceUrl}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  web: {
    flex: 1,
    width:width,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PromotionWebviewScreen
