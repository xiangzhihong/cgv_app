import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const MoreBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.moreBtn}>
    <Text style={styles.moreText}>更多</Text>
    <AntDesign name="right" style={styles.rightIcon} />
  </TouchableOpacity>
)

const SectionTitle = ({ title = '', morePress= () => {} }) => (
  <View style={styles.titleLayer}>
    <Text style={styles.titleText}>{title}</Text>
    <MoreBtn onPress={morePress}/>
  </View>

)

const styles = StyleSheet.create({
  moreBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 40,
    paddingVertical: 15,
  },
  moreText: {
    fontSize: 15,
    color: '#999',
  },
  rightIcon: {
    color: '#ccc',
    fontSize: 15,
  },
  titleLayer: {
    flexDirection:'row',
    backgroundColor:'#fff',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight:'bold',
    marginLeft: 15,
    marginTop: 15,
    fontSize: 18,
  },
})

export default SectionTitle
