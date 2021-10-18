import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import toTop from '../../../../assets/images/home/toTop.png';

const HomeToTop = props => {
  const {onPress = () => {}} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>
      <Image source={toTop} style={{width: 50, height: 50}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 6,
    right: 6,
  },
});

export default HomeToTop;
