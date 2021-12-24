import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TipCard = ({text = '惠', style, textStyle}) => {
  return (
    <View style={[styles.discount, { backgroundColor: '#FC5869' }, style]}>
      <Text style={[{ color: '#fff' }, textStyle]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  discount: {
    flexDirection: 'row',
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginTop: 2,
    borderRadius: 2,
  },
})

export default TipCard
