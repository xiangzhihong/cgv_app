import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SectionHeader = (
  {
    title = '剧照·花絮',
    renderRight
  }
) => {
  return (
    <View style={styles.container}>
      <Text type={"heading"} bold >{title}</Text>
      {
        renderRight ? renderRight() : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default SectionHeader
