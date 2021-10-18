import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import AllMovieScreen from '../screens/AllMovieScreen/AllSellMovieScreen';
import CitySelectScreen from "./CitySelectScreen";

export const stacks = [
  {
    name: 'AllMovieScreen',
    component: AllMovieScreen,
    options: {headerShown: false},
  },
  {
    name: "CitySelectScreen",
    component: CitySelectScreen,
    options: { title: '选择城市' },
  },
];

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FC5869',
  },
});
