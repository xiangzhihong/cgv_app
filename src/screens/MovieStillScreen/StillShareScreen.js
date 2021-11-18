import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet,Image, Button, Text, Dimensions, Platform } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useHeaderHeight } from '@react-navigation/stack'
import CameraRoll from '@react-native-community/cameraroll'
import { tools } from '../../utils'
import httpConfig from "../../api/httpConfig";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

let carousel = null
const StillShareScreen = (
  {
    route,
    navigation,
    stillContent = [],
  },
) => {
  const HeaderHeight = useHeaderHeight()
  const { params = {} } = route
  const { active = 0, title, images, description } = params
  const [activeIndex, setActiveIndex] = useState(active)

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          paddingTop: 60,
        }}>
          <Image
            style={{
              width: deviceWidth - 40,
              height: deviceHeight * 0.8 - 100,
              backgroundColor: '#F5F5F5',
            }}
            resizeMode="contain"
            source={{ uri: `${httpConfig.mediaUrl}${item}` }}
          />
      </View>
    )
  }

  const onClickShare = () => {
    navigation.navigate('MovieShareScreen', {
      type: 'movie',
      title, description, images,
      activeIndex,
    })
  }

  const downloadImage = async () => {
    try{
      const uri = httpConfig.mediaUrl + images[activeIndex]
      await CameraRoll.save(uri)
      tools.Toast.toast('保存成功',1)
    }catch (e) {
      console.log(e)
    }
  }

  return (
    <View>
      <View
        style={{
          width: '100%',
          height: (deviceHeight - HeaderHeight) / 4 * 3,
        }}>
          <Carousel
            ref={e => carousel = e}
            removeClippedSubviews={false}
            onSnapToItem={index => {
              setActiveIndex(index)
            }}
            firstItem={activeIndex}
            data={images}
            renderItem={renderItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth - 40}
            layout="tinder"
          />
      </View>
      <View style={styles.shareBottom}>
        <Text type="normal"><Text type="normal" style={{ color: '#FC5869' }}>{activeIndex + 1}</Text>/{images.length}</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={onClickShare} style={[styles.share, { borderColor: '#FC5869' }]} textStyle={{ color: '#FC5869' }} title="分 享"/>
          <Button onPress={downloadImage} style={[styles.download, { backgroundColor: '#FC5869' }]} title="下 载"/>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  shareBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  share: {
    backgroundColor: '#fff',
    borderWidth: 0.6,
    borderRadius: 20,
    padding: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginRight: 7,
  },
  download: {
    borderRadius: 20,
    padding: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
})

export default StillShareScreen

