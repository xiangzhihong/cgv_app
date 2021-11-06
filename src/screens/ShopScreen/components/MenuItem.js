import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Badge from '../../../common/Badge'

const MenuItem = ({ title, imgSource, num, onPress = () => {} }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Badge imgSource={imgSource} num={num}/>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  title: {
    marginTop: 6,
  },
})

export default MenuItem
