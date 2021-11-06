import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { navigate } from '../../../utils'

const FriendCardItem = ({ item }) => (
  <TouchableOpacity style={styles.topicItem} onPress={() => navigate('FriendCardDetailScreen', { item })} >
    <View style={styles.row}>
      {
        item.product.internalName == null ?
          <View style={[styles.topicStyle, { backgroundColor: '#fff' }]} />
          :
          <View style={[styles.topicStyle, styles.center, { backgroundColor: '#FC5869' }]}>
            <Text allowFontScaling={false} style={styles.cardTitleStyle}>{item.product.internalName}</Text>
          </View>
      }
    </View>
    <Text allowFontScaling={false} style={styles.name}>{item.product.productName}</Text>
    <View style={styles.priceLayer}>
      <Text allowFontScaling={false} style={styles.redText}>¥<Text allowFontScaling={false} style={styles.price}>{item.price + item.taxAmount}</Text></Text>
    </View>
    <View style={[styles.center]}>
      <Text allowFontScaling={false} style={styles.originalPrice}>¥{parseFloat(item.product.productRating)}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  topicItem: {
    width: 100,
    height: 125,
    marginRight: 8,
    borderRadius: 3,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  topicStyle: {
    flexDirection: 'row',
    borderRadius: 3,
    height: 20,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 11,
  },
  name: {
    fontSize: 13,
    alignSelf: 'center',
    marginTop: 12,
  },
  priceLayer: {
    marginTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  redText: {
    fontFamily: 'Avenir',
    color: '#FC5869',
    fontWeight: 'bold',
    fontSize: 13,
  },
  price: {
    fontSize: 29,
  },
  originalPrice: {
    fontSize: 13,
    color: '#ccc',
    textDecorationLine: 'line-through',
  },
})

export default FriendCardItem
