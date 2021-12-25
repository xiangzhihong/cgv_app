import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const CircleClick = (
  {
    onPress,
    text,
    textStyle,
    style,
    isActive,
    activeColor,
    inactiveColor,
    textActiveColor,
    textInactiveColor
  }
) => {

  const Container = onPress ? TouchableOpacity : View
  const backgroundActiveColor = activeColor ? activeColor : '#FC5869'
  const backgroundInactiveColor = inactiveColor ? inactiveColor : '#eee'
  const textActiveTintColor = textActiveColor ? textActiveColor : '#fff'
  const textInactiveTintColor = textInactiveColor ? textInactiveColor : '#999999'
  return (
    <Container style={[styles.circle, style,  {backgroundColor: isActive ? backgroundActiveColor : backgroundInactiveColor}]} activeOpacity={onPress ? 0.7 : 1} >
      <Text style={[textStyle, {color: isActive ? textActiveTintColor : textInactiveTintColor}]} >{text}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CircleClick
