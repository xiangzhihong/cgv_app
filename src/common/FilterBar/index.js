import React from 'react'
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StyleSheet,
} from 'react-native'

const FilterBar = ({ title, rightBtnStatus=true, describtion, onPress }) => {
  const Continer = rightBtnStatus ? TouchableOpacity : View
  return (
    <Continer style={styles.box} onPress={rightBtnStatus ? onPress : null}>
      <Text style={styles.describtion}>{describtion}</Text>
      {rightBtnStatus ?<Image style={styles.img} source={require('../../assets/images/promotion/all.png')}/>:null}
      {rightBtnStatus ?<Text style={styles.text}>{title}</Text>:null}
    </Continer>
  )
}
const styles = StyleSheet.create({
  box: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  describtion: {
    alignSelf: 'flex-start',
    flex: 1,
    color: '#222',
  },
  img: {
    height: 12,
    width: 12,
  },
  text: {
    marginLeft: 3,
    color:'#777',
    fontSize: 14,
  },
})

export default FilterBar
