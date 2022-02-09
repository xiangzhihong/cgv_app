import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../../../../common/Card/Card';
import {tools} from '../../../../utils';
import {goBack} from '../../../../utils/rootNavigation';

const ShopCartContainer = ({
  current,
  getDscResult: _getDscResult,
  addToCart: _addToCart,
  removeFromCart: _removeFromCart,
  resetCheckoutCouponState: _resetCheckoutCouponState,
}) => {

  const confirmClearCart = () => {
    tools.confirm(
      '购物车清空后无法恢复\n确认清空购物车？',
      undefined,
      () => {
        _resetCheckoutCouponState();
        addCartShop(null, 3);
        goBack();
      },
      '清空',
    );
  };

  const CountBtns = ({count, reduce, add}) => (
    <>
      {count > 0 && (
        <>
          <TouchableOpacity onPress={reduce}>
            <AntDesign
              name="minuscircle"
              size={21}
              color="#FC5869"
              style={styles.minuIconStyle}
            />
          </TouchableOpacity>
          <Text bold type="bodyheading" style={styles.countNum}>
            {count}
          </Text>
        </>
      )}
      <TouchableOpacity onPress={add}>
        <AntDesign
          name="pluscircle"
          size={21}
          color="#FC5869"
          style={styles.plusIconStyle}
        />
      </TouchableOpacity>
    </>
  );

  const addCartShop = (item, status) => {
    let arr = []
    let arr2= []

    if (item) {
      if (status === 1) {
        let quantity = 1
        const itemIndex = current.productOrder.product.products.findIndex(i => i.id === item.id)
        if (itemIndex > -1) {
          const obj = current.productOrder.product.products[itemIndex]
          quantity = obj.quantity + 1
          arr = current.productOrder.product.products.map((ele, index) => {
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
            ...current.productOrder.product.products,
            { ...item, quantity: 1 }
          ]
        }
      }

      if (status === 2) {
        const targetItem = current.productOrder.product.products.find(i => i.id === item.id)
        if (targetItem.quantity <= 1) {
          current.productOrder.product.products.forEach(i => {
            if (i.id !== item.id) {
              arr.push(i)
            }
          })
        } else {
          arr = current.productOrder.product.products.map(i => {
            if (i.id === item.id) {
              return {
                ...i,
                quantity: i.quantity - 1,
              }
            }
            return i
          })
        }
        console.log(arr)
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
    }
    if(status === 3) {
      arr2 = []
    }
    _getDscResult({
      orderChnl: '07',
      pointUseYn: current.paymentMethod.point.useYn,
      orderId: current.onlineOrderNo,
      coupons: [...current.ticketOrder.ticketCoupons],
      mbrNm: current.ticketOrder.memberCard.memberCardName,
      mbrCardNo: current.ticketOrder.memberCard.memberCardNo,
      mbrCardPrice: current.ticketOrder.memberCard.memberCardAmount,
      mbrCardType: current.ticketOrder.memberCard.memberCardType,
      mbrCardPwd: current.ticketOrder.memberCard.memberCardPassword,
      gftCardNm: current.paymentMethod.memberCard.cardName,
      gftCertNo: current.paymentMethod.memberCard.cardNo,
      gftAuthNo: current.paymentMethod.memberCard.cardType,
      gftCertPrice: current.paymentMethod.memberCard.paymentAmount,
      prods: arr2,
      vouchers: current.ticketOrder.vouchers,
      eventNo: current.ticketOrder.specialPromo.promoId,
      eventType: current.ticketOrder.specialPromo.promoUseSeatNo,
    });
  };

  return (
    <Card type="clear" style={styles.container}>
      <View>
        {/* <SectionHeader title="已选商品" isRenderRight={true} rightText="清空购物车"/> */}
        <View style={styles.sectionHeaderContainer}>
          <Text type="subheading" bold>
            已选商品
          </Text>
          <View style={styles.moreBtn}>
            {!current.buyOrderStatus &&
              current.productOrder.product &&
              current.productOrder.product.products &&
              current.productOrder.product.products.length > 0 && (
                <TouchableOpacity onPress={confirmClearCart}>
                  <Text type="subheading" bold style={styles.moreText}>
                    清空购物车
                  </Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
        {current.productOrder &&
          current.productOrder.product &&
          current.productOrder.product.products &&
          current.productOrder.product.products.length > 0 &&
          current.productOrder.product.products.map((item, index) => (
            <View key={index.toString()}>
              <View style={styles.discountLine}>
                <View style={styles.shop2TB1}>
                  <Text style={styles.shop2TB1L}>
                    {item.isVirtual === '1' ? '套餐' : '单品'}
                  </Text>
                  <Text type="subheading" style={styles.discountName}>
                    {item.productName}
                  </Text>
                </View>
                <View style={styles.shop2TB2}>
                  <Text type="bodyheading" style={styles.discountAmount}>
                    x{item.quantity}
                  </Text>
                </View>
                <Text type="bodyheading" style={styles.discountAmount}>
                  ￥{item.price}
                </Text>
                <CountBtns
                    count={item.quantity}
                    reduce={() => {
                      _removeFromCart(item);
                      addCartShop(item, 2);
                    }}
                    add={() => {
                      _addToCart(item);
                      addCartShop(item, 1);
                    }}
                />
              </View>
              {
                item?.subProduct?.length > 0 ?
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                      item?.subProduct.map((childItem, index) => (
                        <Text key={index.toString()} style={{color: '#6e6e6e'}}>
                          {childItem.productName}*{childItem.quantity}{item?.subProduct?.length > index+ 1 ? '+' : null}
                        </Text>
                      ))}
                  </View>
                  :null
              }
              <View style={styles.detailLine} />
            </View>
          ))}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text type="subheading">原价：</Text>
          <Text type="subheading" bold style={{color: '#333'}}>
            ¥
            <Text type="heading" bold>
              {current.productOrder.shopTotal.totalAmount.toFixed(1)}
            </Text>
          </Text>
        </View>
      </View>
    </Card>
  );
};

ShopCartContainer.propTypes = {
};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    padding: 12,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 12,
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#999',
  },
  discountLine: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountName: {
    width: 180,
    height: 29,
    lineHeight: 29,
    color: '#222222',
    overflow: 'hidden',
  },
  discountAmount: {
    width: 50,
    height: 29,
    lineHeight: 29,
    textAlign: 'right',
    color: '#333333',
    marginRight: 5,
  },
  shop2TB: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  shop2TB1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shop2TB1L: {
    textAlign: 'center',
    fontSize: 11,
    color: '#F1A23D',
    borderColor: '#F1A23D',
    borderRadius: 2,
    borderWidth: 1,
    marginRight: 4,
    overflow: 'hidden',
    padding: 2,
  },
  shop2TB2: {
    height: 21,
    flexDirection: 'row',
  },
  shop2TB21: {
    fontSize: 15,
    fontWeight: '400',
    width: 50,
    height: 21,
    lineHeight: 21,
    marginRight: 10,
    textAlign: 'right',
    color: '#222',
  },
  detailLine: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ShopCartContainer;
