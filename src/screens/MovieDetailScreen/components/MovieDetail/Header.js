import React from 'react'
import { View, StyleSheet, Image,Text, Dimensions, TouchableOpacity, Animated, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
const { width } = Dimensions.get('window')
const HeaderHeight = 44
const HeaderPaddingTop = Platform.OS === 'ios' ? width >= 375 ? 40 :  10 : 0

const Header = (
  {
    headerTitle = '',
    headerTitleStyle,
    onRightPress,
    onLeftPress,
  },
) => {
  return (
    <View style={[styles.container, { backgroundColor: 'transparent'}]}>
      <View style={styles.nav}>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchLeft} hitSlop={{ left: 15, right: 30, bottom: 10 }} onPress={() => onLeftPress()}>
          <Icon name="chevron-thin-left" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.center}>
          <Animated.Text type="heading" bold style={[{ color: '#fff', fontWeight: 'bold', fontSize: 16 }, { opacity: 0 }, headerTitleStyle]}>{headerTitle}</Animated.Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchLeft} hitSlop={{ left: 30, right: 15, bottom: 10 }} onPress={() => onRightPress()}>
          <Image source={require('../../../../assets/images/movie/share.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: HeaderPaddingTop,

  },
  nav: {
    width,
    height: HeaderHeight,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  searchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchRight: {
    paddingVertical: 5,
    marginLeft: 20,
    flex: 1,
  },
})
