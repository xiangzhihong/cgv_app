import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import Card from '../../../../common/Card/Card';

const ShopTotalContainer = ({current}) => {
  return (
    <Card type="clear" style={styles.container}>
      <View>
        <View style={styles.sectionHeader}>
          <Text type={"subheading"} bold >商品小计：</Text>
          <View
            style={styles.moreBtn}>
            <Text type={"subheading"} bold style={styles.moreText}>¥<Text type={"heading"} bold style={styles.moreText}>{current.productOrder.shopTotal.totalAmount.toFixed(1)}</Text></Text>
          </View>
        </View>
        {current.productOrder.shopTotal.details && current.productOrder.shopTotal.details.length > 0 && current.productOrder.shopTotal.details.map((item, index) => (
          <View style={styles.discountLine} key={index}>
            <Text type='subheading' style={styles.discountName}>已优惠</Text>
            <Text type='bodyheading' style={styles.discountAmount}>-￥{item.dsc_price}</Text>
          </View>
        ))}
      </View>
    </Card>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    padding: 12
  },
  sectionTitle: {
    color: '#222222'
  },
  sectionTitleButton: {
    color: '#777777'
  },
  discountLine: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18
  },
  discountName: {
    width: 180,
    height: 29,
    lineHeight: 29,
    color: '#777',
  },
  discountAmount: {
    width: 50,
    height: 29,
    lineHeight: 29,
    textAlign: 'right',
    color: '#F1A23D',
    marginRight: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#333333',
  },
});

export default ShopTotalContainer;
