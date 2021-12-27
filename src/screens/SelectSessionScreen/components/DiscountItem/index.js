import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import TipCard from '../../../../common/TipCard'
import { tools,navigate } from '../../../../utils'


export default (
  {
    onPress,
    title,
    text,
    icon,
    isLast = true,
    ...propd
  }
) => {

  const Container = onPress ? TouchableOpacity : View

  return (
    <Container activeOpacity={0.7} style={styles.container} onPress={()=>{onPress ? navigate('FriendCardListScreen') : ''}}>
      <View style={[styles.box, {borderBottomWidth: isLast ? 0: tools.minLineHeight()}]}>
        <View style={styles.left}>
          <TipCard {...propd} text={text} textStyle={{textAlign: 'center'}}/>
          <Text type={'normal'} style={{marginLeft: 8}}>{title}</Text>
        </View>
        {icon}
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF7EC',
    paddingLeft: 15
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF7EC',
    borderBottomWidth: 1,
    paddingVertical: 7,
    borderBottomColor: '#E5E5E5'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
