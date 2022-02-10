import React, { useContext } from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import Card from '../../../../common/Card/Card';

const {width} = Dimensions.get('window')

const TopMessageContainer = ({minutes, seconds }) => {
  const renderMessage = () => (
    <Text style={styles.messageText}>请您在 {minutes}分{seconds}秒 内完成支付，超时将取消订单。</Text>
  );
  return (
    <Card type="clear" style={styles.container}>
      {renderMessage()}
    </Card>
  );
};

const styles = StyleSheet.create({
  messageText:{
    backgroundColor: '#F1A23D',
    height: 32,
    alignItems: 'center',
    width: width,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 32,
    color: '#fff'
  }
});

export default TopMessageContainer;
