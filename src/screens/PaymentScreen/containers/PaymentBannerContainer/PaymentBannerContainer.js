import React, { useContext } from 'react';
import {View, Text, Image,TouchableOpacity, StyleSheet,} from 'react-native';
import Card from '../../../../common/Card/Card';

const PaymentBannerContainer = ({ seeMore }) => {
  return (
    <Card type="clear" style={styles.container}>
      <View style={styles.sectionTitle}>
        <Image
          style={styles.cardImg}
          resizeMode="cover"
          source={require('../../../../assets/images/moviePayment/VIP.png')}
        />
        <View style={styles.card}>
          <Text type="subheading" style={{color: '#fff'}}>开通E优卡立享购票优惠</Text>
        </View>
        <TouchableOpacity onPress={seeMore} style={styles.sectionTitleButton}><Text  style={{color: '#fff'}}>{`去开卡 >`}</Text></TouchableOpacity>
      </View>
    </Card>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fc5869',
    marginHorizontal: 12,
    padding: 12
  },
  sectionTitle: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  sectionTitleButton: {
    color: '#777777',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImg: {
    width: 40,
    height: 40,
  },
  card: {
    height: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default PaymentBannerContainer;
