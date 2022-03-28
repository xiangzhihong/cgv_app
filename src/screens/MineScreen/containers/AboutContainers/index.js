import React from 'react'
import { View,Image,Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import ListItem from '../../../../common/ListItem'
import { about, message, service, compeo } from '../../../../assets/images/mine'

const num = 0
const Navs = [
  {
    icon: compeo,
    title: '常用观影人',
    route: 'CommonPeopleScreen',
    needLoggedIn: true,
  },
  {
    icon: message,
    title: '我的消息',
    route: 'ViewMessageScreen',
    needLoggedIn: true,
  },
  {
    icon: service,
    title: '客服',
    route: 'ServiceScreen',
    needLoggedIn: true,
  },
  {
    icon: about,
    title: '关于CGV',
    route: 'AboutScreen',
    needLoggedIn: false,
  },
]

export default ({ goto, status }) => {

  return (
    <View style={{ marginVertical: 10 }}>
      {
        Navs.map((item, index) => (
          <ListItem
            key={item.route}
            onPress={() => goto(item.route, item.needLoggedIn)}
            isLast={index === Navs.length - 1}
            renderRight={() => <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {status && item.route === 'ViewMessageScreen' ? <Badge num={num} /> : null}
              <Icon name="chevron-thin-right" size={13} color="#ccc" />
            </View>}
            textStyle={{ marginLeft: 8, fontSize: 14, color: '#333' }}
            text={item.title}
            renderIcon={() => <Image source={item.icon} style={{ width: 20, height: 20 }} />}
          />
        ))
      }
    </View>
  )
}


const Badge = (
  { number = 100 },
) => {
  return (
    <View style={styles.circle}>
      <Text style={{ color: '#fff' }}>{number > 99 ? '...' : num}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 4,
    backgroundColor: '#FC5869',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
