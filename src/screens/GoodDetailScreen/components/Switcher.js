import React from 'react'
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native'
import Swiper from 'react-native-swiper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import httpConfig from "../../../api/httpConfig";

const { width, height } = Dimensions.get('window')

const splitArray = (arr, len) => {
  const arrLength = arr.length
  const newArr = []
  for (let i = 0; i < arrLength; i += len) {
    newArr.push(arr.slice(i, i + len))
  }
  return newArr
}

const cardWidth = (width - 50) / 3

const GoodCard = ({ item, btnText, onPress }) => {
  const imgWidth = cardWidth - 1
  return (
    <View style={styles.card}>
      {item.smallImageUrl ?
      <Image
        style={{ width: imgWidth, height: imgWidth }}
       source={{uri: httpConfig.mediaUrl +item.smallImageUrl}}/> : <Image
        source={require('../../../assets/images/shop/goodPic.png')}
        style={{ width: imgWidth, height: imgWidth }}
      />}
      <Text numberOfLines={1} style={styles.cardTitle}>{item.productName}</Text>
      {btnText ?
        <TouchableOpacity style={styles.cardBtn} onPress={onPress}>
          <Text style={styles.cardBtnText}>{btnText}</Text>
        </TouchableOpacity> : <View style={styles.holder} />}
    </View>
  )
}

const Section = ({ title, len, btnText, list = [], onPress }) => {
  if (!list.length) {
    return null
  }
  const data = splitArray(list, 3)
  return (
    <View >
      <View style={styles.titleLayer}>
        <Text style={styles.title}>{title}（{len}）</Text>
      </View>
      <View style={{ height: cardWidth + 70 + (btnText ? 38 : 0) }}>
        <Swiper
          showsButtons={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          removeClippedSubviews={false}
          loop={false}
        >
          {data.map((items, index) => (
            <View style={styles.ferry} key={`key-${index}`}>
              {items.map((item, i) => <GoodCard key={`key-card-${i}`} item={item} btnText={btnText} onPress={() => onPress(i)} />)}
            </View>
          ))}
        </Swiper>
      </View>
    </View>
  )
}

const Switcher = ({ changes = [], more = [], singles = [], onPressChange, onPressMore }) => {

  if (!singles.length && !changes.length && !more.length) {
    return null
  }

  return (
    <View style={styles.switcher}>
      <Section title="不可换选" len={singles?.length} btnText="" list={singles} />
      <Section title="可换选" len={changes?.length} btnText="换一换" list={changes} onPress={onPressChange} />
      <Section title="更多选择" len={more?.length} btnText="选一选" list={more} onPress={onPressMore} />
    </View>
  )
}

const styles = StyleSheet.create({
  switcher: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 0,
    paddingBottom: 0,
  },
  titleLayer: {
    borderLeftWidth: 3,
    borderColor: '#FC5869',
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    marginLeft: 5,
  },
  swiperStyle: {
    height: 190,
  },
  dotStyle: {
    backgroundColor: '#eee',
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  activeDotStyle: {
    backgroundColor: '#FC5869',
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  card: {
    width: cardWidth,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
  },
  cardTitle: {
    marginTop: 10,
    marginHorizontal: 3,
  },
  cardBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: cardWidth - 10,
    paddingVertical: 10,
  },
  cardBtnText: {
    fontSize: 13,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F1A23D',
    color: '#F1A23D',
    borderRadius: 3,
  },
  holder: {
    height: 10,
  },
  ferry: {
    flexDirection: 'row',
  },
})

export default Switcher
