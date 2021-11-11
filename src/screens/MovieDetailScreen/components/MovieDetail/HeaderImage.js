import React from 'react'
import {StyleSheet,Dimensions,Image, TouchableOpacity } from 'react-native'

const HeaderImage = (
  {
    source,
    imageHeight = 230,
  },
)=> {

  return (
    <TouchableOpacity activeOpacity={0}  style={[styles.bgContainer, {height: imageHeight }]}>
      <Image source={source} style={styles.backgroundImage}/>
      <Image source={require('../../../../assets/images/movie/play.png')} style={{ width: 32, height: 32 }}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    width: Dimensions.get('window').width,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
export default HeaderImage
