import {View} from 'react-native';
import React from 'react';
import {tools} from '../../utils';

const ItemSeparator = ({containerStyle, lineStyle}) => {
  return (
    <View style={[{backgroundColor: '#fff', paddingLeft: 15}, containerStyle]}>
      <View
        style={[
          {backgroundColor: '#C8C7CC', height: tools.minLineHeight()},
          lineStyle,
        ]}
      />
    </View>
  );
};

export default ItemSeparator;
