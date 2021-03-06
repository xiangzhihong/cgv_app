import React  from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import Card from '../../../../common/Card/Card'
import SectionHeader from '../../../../common/SectionHeader'
import { navigate } from '../../../../utils'

const ShopCouponContainer = () => {

  return (
    <Card type="clear" style={styles.container}>
      <View>
        <SectionHeader title="商品优惠券" isRenderRight isRenderButton onClick={() => navigate('ModalCGVPayScreen', {
          confirm: (data)=> _getDscResult(data),
          addCard: ()=> navigate('MyTicketsAddCashCouponScreen', { title: '添加优惠券', status: 1, refresh: ()=>{}
          }),
          status: 6,
          title: '使用商品优惠券',
          addCardTitle: '添加优惠券',
          mepty: '您还没有优惠券～'
        })}/>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:12,
    padding:12
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
    paddingLeft: 15
  },
  discountName: {
    height: 29,
    lineHeight: 29,
    color: '#777',
    fontFamily: Platform.OS === 'ios' ? null : ''
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
    marginBottom:12,
  },
})

export default ShopCouponContainer;
