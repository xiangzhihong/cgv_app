import React from 'react';
import {View, Text} from 'react-native';
import {Alert} from '../../common/Alert';

const components = {
  alert: Alert,
};

const AlertScreen = ({navigation, route}) => {
  const {component = 'alert', ...rest} = route.params;
  const Comp = components[component];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Comp {...rest} />
    </View>
  );
};

export default AlertScreen;
