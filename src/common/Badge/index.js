import React from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'

const Badge = ({ imgSource, num, size, style }) => (
    <ImageBackground source={imgSource} style={[size === 'small' ? styles.imgSmall : styles.img, style]}>
      {!!num &&
        <View style={[styles.numView, size === 'small' ? styles.numViewSmall : null]}>
          <Text style={styles.numText}>{num > 99 ? '···' : num}</Text>
        </View>
      }
    </ImageBackground>
)

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
  },
  imgSmall: {
    width: 24,
    height: 24,
  },
  numView: {
    backgroundColor: '#FC5869',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'absolute',
    right: -5,
    top: -3,
    borderRadius: 9,
    width: 18,
    height: 18,
  },
  numViewSmall: {
    right: -7,
    top: -5,
    borderRadius: 7,
    width: 14,
    height: 14,
  },
  numText: {
    color: '#fff',
    fontSize: 10,
  },
})

export default Badge
