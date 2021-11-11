import React from 'react'
import { View,Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import ListItem from '../../../../common/ListItem'
import { right, integral, shop, know } from '../../../../assets/images/mine'

const Navs = [
  {
    icon: right,
    title: '朋友权益',
    route: 'MyLevelScreen',
  },
  {
    icon: integral,
    title: '我的积分',
    route: 'MyIntegralScreen',
  },
  {
    icon: shop,
    title: '积分商城',
    route: 'IntegralMallScreen',
  },
  {
    icon: know,
    title: '了解PACONNIE',
    route: 'KnownScreen',
  },
]


export default ({ goto }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <ListItem
        titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
        title="PACONNIE CLUB"
        text="了解我的等级权益"
      />
      {
        Navs.map((item, index) => (
          <ListItem
            key={item.route}
            onPress={() => goto(item.route)}
            isLast={index === Navs.length - 1}
            renderRight={() => <Icon name="chevron-thin-right" size={13} color="#ccc" />}
            textStyle={{ marginLeft: 8, fontSize: 14, color: '#333' }}
            text={item.title}
            renderIcon={() => <Image source={item.icon} style={{ width: 20, height: 20 }} />}
          />
        ))
      }
    </View>
  )
}
