import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Image from 'react-native-fast-image'

const Avatar = (
  {
    onPress,
    source,
    style,
  },
) => {

  const ContainerView = onPress ? TouchableOpacity : View

  return (
    <ContainerView>
      <Image
        style={[styles.avatar, style]}
        source={source}
      />
    </ContainerView>
  )

}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
})


export default Avatar
