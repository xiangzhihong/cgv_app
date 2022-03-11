import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import FriendCardItem from './FriendCardItem'
import SectionTitle from './SectionTitle'

const FriendCards = ({ list = [], seeMore = () => {} }) => (
  <View style={styles.friendCardViewStyle}>
    <SectionTitle title="朋友卡" morePress={seeMore} />
    <FlatList
      data={list}
      horizontal
      style={styles.cardList}
      renderItem={({ item }) => {
        return <FriendCardItem item={item} />
      }}
      keyExtractor={item => `key_${item.id}`}
      showsHorizontalScrollIndicator={false}
    />
  </View>
)

const styles = StyleSheet.create({
  friendCardViewStyle: {
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingBottom: 15,
  },
  cardList: {
    marginLeft: 15,
    flexDirection: 'row',
  },

})

export default FriendCards
