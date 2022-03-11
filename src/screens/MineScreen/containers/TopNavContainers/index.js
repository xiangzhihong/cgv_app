import React from 'react'
import { View, Image,Text,StyleSheet, TouchableOpacity } from 'react-native'
import { order, ticket, friendCard } from '../../../../assets/images/mine'

const Navs = [
  {
    icon: order,
    title: '订单',
    route: 'MyOrderScreen',
  },
  {
    icon: ticket,
    title: '票券',
    route: 'MyTicketsScreen',
  },
  {
    icon: friendCard,
    title: '朋友卡',
    route: 'MyFriendCardScreen',
  },
]


export default ({ goto }) => {
  return (
    <View style={styles.container}>
      {
        Navs.map((item, index) => (
          <TouchableOpacity key={index} style={styles.item} activeOpacity={0.7} onPress={() => goto(item.route)}>
            <Image source={item.icon} style={{ width: 40, height: 40 }} />
            <Text  style={{ color: '#222', marginTop: 6 }}>{item.title}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 18,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
