import React, { PureComponent } from 'react'
import {View, StyleSheet} from 'react-native'

class SpliteLine extends PureComponent {
  render () {
    return (
      <View style={styles.bg}>
        <View style={styles.border} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor:'#fff',
    height: 0.5,
  },
  border: {
    backgroundColor: '#efefef',
    height: 0.5,
    marginLeft: 15,
  }

})

export default SpliteLine
