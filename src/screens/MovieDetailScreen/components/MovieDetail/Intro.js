import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

const MovieIntro = (
  {
    actor = '',
    director = '',
    showMore,
    onClickShow,
    desc = '',
    productAttributes
  },
) => {

  const getAttr = (target = [], attr) => {
    const res = target.filter(item => item.attrName === attr)
    if(res.length > 0) {
      return res[0].attrValue
    }
    return ''
  }

  const getVal = (attr) => {
    return getAttr(productAttributes, attr)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.director}>
          <Text style={styles.title} type="subheading">导演</Text>
          <Text type="subheading">{getVal('director')}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.actor}>
          <Text style={styles.title} type="subheading">主演</Text>
          <Text type="subheading">{getVal('actor')}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
        <Text style={{ lineHeight: 24, fontSize: 14 }} type="label" numberOfLines={ showMore ? 0 : 3} >{desc}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onClickShow} style={styles.showMore}>
          <Text type="normal" style={{ marginRight: 4 }}>{showMore ? '收起' : '展开'}</Text>
          <Icon name={showMore ? 'chevron-thin-up' : 'chevron-thin-down'} size={10} color={'#999999'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 14,
  },
  textContainer: {
    paddingHorizontal: 15,
  },
  title: {
    color: '#ABAFBB',
    marginRight: 16,
  },
  director: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderBottomWidth: 0.6,
  },
  actor: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  showMore: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
})

export default MovieIntro
