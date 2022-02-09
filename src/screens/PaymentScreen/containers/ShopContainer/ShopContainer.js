import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import Card from '../../../../common/Card/Card'
import SectionHeader from '../../../../common/SectionHeader'
import {ShopProductItem} from '../../components'
import {navigate} from '../../../../utils'

const ShopContainer = ({ items, current, getDscResult: _getDscResult, addToCart: _addToCart }) => {

  const addCartShop = (item) => {
    let arr = current?.productOrder?.product?.products
    let arr2 = []
    let quantity = 1
    if(item) {
      const itemIndex = current?.productOrder?.product?.products?.findIndex(i => i.id === item.id)
      if (itemIndex > -1) {
        const obj = current?.productOrder?.product?.products[itemIndex]
        quantity = obj.quantity + 1
        arr = current?.productOrder?.product?.products?.map((ele, index) => {
          if (index === itemIndex) {
            return ({
              ...ele,
              quantity,
            })
          }
          return ele
        })
      } else {
        arr = [
          ...arr,
          { ...item, quantity: 1 }
        ]
      }
    }

    arr.map((data) => {
      let o = {};
      if (data.subProduct && data.subProduct.length > 0) {
        o = {
          id: data.productCd,
          prodCd: data.productId,
          qty: data.quantity,
          subprods: data.subProduct.map((ite) => {
            return {
              id: ite.productCd,
              prodCd: ite.productId,
              qty: ite.quantity,
              productAssocCd: ite.productAssocCd,
            };
          }),
        };
      } else {
        o = {
          id: data.productCd,
          prodCd: data.productId,
          qty: data.quantity,
        };
      }
      for (let i = data.quantity; i > 0; i--) {
        arr2.push(o);
      }
    });
    _getDscResult({
      orderChnl: '07',
      pointUseYn: current.paymentMethod.point.useYn,
      orderId: current.onlineOrderNo,
      coupons: [...current.ticketOrder.ticketCoupons],
      prods: arr2,
      mbrNm: current.ticketOrder.memberCard.memberCardName,
      mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
      mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
      mbrCardType: current.ticketOrder.memberCard.memberCardType,
      mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
      gftCardNm: current.paymentMethod.memberCard.cardName,
      gftCertNo: current.paymentMethod.memberCard.cardNo,
      gftAuthNo: current.paymentMethod.memberCard.cardType,
      gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
      vouchers: current.ticketOrder.vouchers,
      eventNo: current?.ticketOrder?.specialPromo?.promoId,
      eventType: current?.ticketOrder?.specialPromo?.promoUseSeatNo,
    })
  }

  const addCart2Shop = (item) => {
    let arr2 = []
    if(item.length > 0) {
      item.map((data) => {
        let o = {};
        if (data.subProduct && data.subProduct.length > 0) {
          o = {
            id: data.productCd,
            prodCd: data.productId,
            qty: data.quantity,
            subprods: data.subProduct.map((ite) => {
              const oo = {
                id: ite.productCd,
                prodCd: ite.productId,
                qty: ite.quantity,
                productAssocCd: ite.productAssocCd,
              };
              return oo;
            }),
          };
        } else {
          o = {
            id: data.productCd,
            prodCd: data.productId,
            qty: data.quantity,
          };
        }
        for (let i = data.quantity; i > 0; i--) {
          arr2.push(o);
        }
      });
    }

    _getDscResult({
      orderChnl: '07',
      pointUseYn: current.paymentMethod.point.useYn,
      orderId: current.onlineOrderNo,
      coupons: [...current.ticketOrder.ticketCoupons],
      prods: arr2,
      mbrNm: current.ticketOrder.memberCard.memberCardName,
      mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
      mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
      mbrCardType: current.ticketOrder.memberCard.memberCardType,
      mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
      gftCardNm: current.paymentMethod.memberCard.cardName,
      gftCertNo: current.paymentMethod.memberCard.cardNo,
      gftAuthNo: current.paymentMethod.memberCard.cardType,
      gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
      vouchers: current.ticketOrder.vouchers,
      eventNo: current?.ticketOrder?.specialPromo?.promoId,
      eventType: current?.ticketOrder?.specialPromo?.promoUseSeatNo,
    })
  }

  return (
    <Card type="clear" style={styles.container}>
      {items?.length > 0 ? <SectionHeader title="热销商品" isRenderRight onClick={() => navigate('GoodListScreen', {type: 'movie', update: (data)=> {
          addCart2Shop(data)
        }})}/> : null}
      <FlatList
        data={items}
        horizontal
        style={styles.cardList}
        renderItem={({ item }) => {
          return <ShopProductItem navigation item={item} add={() => {
            addCartShop(item)
            _addToCart(item)
          }} type='movie' goAdd={(i) => {
            addCartShop(i)
          }}/>
        }}
        keyExtractor={item => `key_${item.id}`}
        showsHorizontalScrollIndicator={false}
      />
    </Card>

  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    padding: 12
  },
  cardList: {
    flexDirection: 'row',
  },
})

export default ShopContainer;
