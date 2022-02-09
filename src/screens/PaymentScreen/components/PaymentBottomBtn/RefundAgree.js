import React, {useContext } from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native'

const RefundAgree = () => {
  return (
          <ScrollView
            style={styles.contain}>
            <Text style={styles.popContent}>
              1.影片开场2小时之前且未取票时，支持退票；
            </Text>
            <Text style={styles.popContent}>
              2.如购买的是2小时内放映的场次、特殊购票场等特殊场次，不支持退换；
            </Text>
            <Text style={styles.popContent}>
              3.退票后，所使用的代金券、优惠券、积分等会原样返回到购买人账户；
            </Text>
            <Text style={styles.popContent}>
              4.不支持订单部分取消（如：购票同时购买商品的订单取消情况下，该订单将全部取消）；
            </Text>
            <Text style={styles.popContent}>
              5.购票的同时购买商品订单中，商品兑换有效期至影片观影后1天，过期不可兑换；
            </Text>
            <Text style={styles.popContent}>
              6.单独购买的商品兑换有效期为购买当日起14天内，过期及已打印券不能退换
              (请参考打印凭条提示)；
            </Text>
            <Text style={styles.popContent}>
              7.影片放映时间过期的情况，影票视为作费，不可进行退票，请注意影片放映时间；
            </Text>
            <Text style={styles.popContent}>
              8.上述退票规则适用于CGV影城APP、公众号及小程序。
            </Text>
          </ScrollView>

  )
}

const styles = StyleSheet.create({
  contain: {
    marginTop: 20,
    marginBottom: 13,
    paddingHorizontal: 18
  },

})

export default RefundAgree;
