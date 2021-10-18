import { TouchableOpacity, View, StyleSheet, Text, Animated } from 'react-native'
import * as React from 'react'


export default ({ headStyle, headTextStyle, close, top, title, submit, closeColor = '#fff', children }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={close}
      style={styles.container}
    >
      <Animated.View style={[styles.content, {
        transform: [
          {
            translateY: top.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            }),
          },
        ],
      }]}>
        <Header title={title} />
        {children}
        <Footer close={close} submit={submit}/>
      </Animated.View>
    </TouchableOpacity>
  )
}

const Header = (
  {
    title='标题',
    // subtitle='说明文字说明文字说明文字说明文字说明文字'
  }
) => {
  return (
    <View style={{height: 45, alignItems: 'center', justifyContent: 'flex-end'}}>
      <Text style={{textAlign: 'center', fontSize: 16}}>{title}</Text>
      {/*<Text style={{textAlign: 'center', fontSize: 12}}>{subtitle}</Text>*/}
    </View>
  )
}

const Footer = ({ close, submit, closeColor }) => {
  return (
    <View style={{height: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
      <TouchableOpacity style={[styles.closeBtn, {marginRight: '5%'}]} onPress={close}>
        <Text style={{color: '#808080'}}>取消</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.closeBtn, {marginLeft: '5%', backgroundColor: '#FC5869'}]} onPress={submit}>
        <Text  style={{color: '#ffffff'}}>确定</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
    // marginHorizontal: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  head: {
    backgroundColor: '#FC5869',
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holder: {
    height: 1,
    width: 30,
  },
  closeBtn: {
    padding: 10,
    backgroundColor: '#ededed',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  subheading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: '#999999',
  },
})
