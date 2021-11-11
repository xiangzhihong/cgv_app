import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import AllMovieScreen from '../screens/AllMovieScreen/AllSellMovieScreen';
import CitySelectScreen from "./CitySelectScreen";
import PromotionDetailScreen from "./PromotionDetailScreen/PromotionDetailScreen";
import SelectorScreen from "./SelectorScreen/SelectorScreen";
import MovieDetailScreen from "./MovieDetailScreen";

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
  {
    name: 'PromotionDetailScreen',
    component: PromotionDetailScreen,
    options: {
      title: '活动详情',
    },
  },
  {
    name: 'SelectorScreen',
    component: SelectorScreen,
    options: (nav) => {
      const { route } = nav
      const { params = {} } = route
      const {
        title = '活动类型', onRightPress = () => {
        },
      } = params
      return {
        title,
        headerRight: () => (
            <TouchableOpacity style={styles.button} onPress={onRightPress}>
              <Text style={styles.txt}>确定</Text>
            </TouchableOpacity>
        ),
      }
    },
  },
  {
    name: 'MovieDetailScreen',
    component: MovieDetailScreen,
    options: { headerShown: false },
  },
];

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FC5869',
  },
  txt: {
    color: '#fff'
  },
});
