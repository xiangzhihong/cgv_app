import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const CinemaLabel = props => {
  const {data = {}, rightLabelStyle} = props;
  const {type = '2D', title = 'IMAX'} = data;
  return (
    <View style={styles.labelContainer}>
      <View style={styles.labelLeft}>
        <Text style={styles.labelLeftText}>{type}</Text>
      </View>
      <View style={[styles.labelRight, rightLabelStyle]}>
        <Text style={{fontSize: 7}}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    backgroundColor: '#F5F5F5',
    padding: 3,
    borderRadius: 3,
    marginTop: 4,
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9392A7',
    borderWidth: 0.7,
    borderRadius: 2,
    marginRight: 3,
    marginBottom: 3,
  },
  labelLeft: {
    backgroundColor: '#9392A7',
    height: '100%',
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  labelLeftText: {
    fontSize: 7,
    color: '#fff',
  },
  labelRight: {
    padding: 2,
  },
});

export default CinemaLabel;
