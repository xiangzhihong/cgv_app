import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity,Text,Image, StyleSheet, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../../../../common/Card/Card';
import {UPPay, aliPay, Wxpay} from '../../../../nativeBridge/pay';
import {bizstream} from '../../../../bizstream';


const ThirdPartyPaymentMethodContainer = ({
  current,
  selectedCinema,
  getDscResult: _getDscResult,
  getPaymentMethod: _createTicketOrder,
}) => {
  const [isSelected, setIsSelected] = useState(2);
  const [se, setSe] = useState(undefined);
  const [advertList, setAdvertList] = useState([]);
  const [payStatusList, setPayStatusList] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UPPay.getSEPayInfo()
        .then((res) => {
          setSe(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    payAttrFun()
  }, []);

  useEffect(() => {
    if (isSelected === 4) {
      _createTicketOrder(
        Platform.OS === 'ios' ? 4 : parseInt(`10${se?.seType ?? '00'}`, 10),
      );
    } else {
      _createTicketOrder(isSelected);
    }
  }, [isSelected]);

  const payAttrFun = async () => {
    try {
      const data = await bizstream.customer.payAttr(selectedCinema?.facilityId)
      setPayStatusList(data)
    } catch (error) {
      console.log(error)
    }
  }


  const PayByAlipay = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.paycard}
          onPress={() => {
            getPayCode(2);
          }}>
          <View style={styles.cardB}>
            <Image
              style={styles.cardImg}
              source={require('../../../../assets/images/pay/alipay.png')}
            />
            <View>
              <Text style={styles.cardT1}>支付宝支付</Text>
              <Text style={styles.cardT2}>推荐支付宝用户使用</Text>
            </View>
          </View>
          <View style={styles.cardT1p}>
            <AntDesign
              name={isSelected === 2 ? 'checkcircle' : 'checkcircleo'}
              size={18}
              color={isSelected === 2 ? '#F1A23D' : '#DDDDDD'}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const PayByWechat = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.paycard}
          onPress={() => {
            getPayCode(1);
          }}>
          <View style={styles.cardB}>
            <Image
              style={styles.cardImg}
              source={require('../../../../assets/images/pay/wechatpay.png')}
            />
            <View>
              <Text style={styles.cardT1}>微信支付</Text>
              <Text style={styles.cardT2}>亿万用户的选择，更快更安全</Text>
            </View>
          </View>
          <View style={styles.cardT1p}>
            <AntDesign
              name={isSelected === 1 ? 'checkcircle' : 'checkcircleo'}
              size={18}
              color={isSelected === 1 ? '#F1A23D' : '#DDDDDD'}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const getBannerList = async () => {
    try {
      const data = await bizstream.admin.getBannerList(
        'APP_YSF_AD',
      );
      setAdvertList(data.slice(0, 1) || []);
    } catch (error) {
      console.log(error);
    }
  };

  const PayByUnionPay = () => {
    return (
      <>
        <TouchableOpacity
          style={[styles.paycard, {borderBottomWidth: 0}]}
          onPress={() => {
            getPayCode(3);
            getBannerList();
          }}>
          <View style={styles.cardB}>
            <Image
              style={styles.cardImg}
              source={require('../../../../assets/images/pay/cloudpay.png')}
            />
            <View>
              <Text style={styles.cardT1}>云闪付</Text>
              <Text style={styles.cardT2}>推荐云闪付用户使用</Text>
            </View>
          </View>
          <View style={styles.cardT1p}>
            <AntDesign
              name={isSelected === 3 ? 'checkcircle' : 'checkcircleo'}
              size={18}
              color={isSelected === 3 ? '#F1A23D' : '#DDDDDD'}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const PayByNativePay = () => {
    if (Platform.OS === 'android' && !se) {
      return null;
    }
    return (
      <>
        <TouchableOpacity
          style={[styles.paycard, {borderBottomWidth: 0, borderTopWidth: 1}]}
          onPress={() => {
            getPayCode(4);
          }}>
          <View style={styles.cardB}>
            <Image
              style={styles.cardImg}
              source={
                Platform.OS === 'ios'
                  ? require('../../../../assets/images/pay/applepay.png')
                  : se?.SEName === 'Mi Pay'
                  ? require('../../../../assets/images/friendCard/mipay.png')
                  : require('../../../../assets/images/friendCard/huaweipay.png')
              }
            />
            <View>
              <Text style={styles.cardT1}>
                {Platform.OS === 'ios' ? 'Apple Pay' : se?.SEName}
              </Text>
              <Text style={styles.cardT2}>{`推荐${
                Platform.OS === 'ios' ? 'Apple Pay' : se?.SEName
              }用户使用`}</Text>
            </View>
          </View>
          <View style={styles.cardT1p}>
            <AntDesign
              name={isSelected === 4 ? 'checkcircle' : 'checkcircleo'}
              size={18}
              color={isSelected === 4 ? '#F1A23D' : '#DDDDDD'}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const getPayCode = (index) => {
    setIsSelected(index);
  };

  return (
    <Card type="clear" style={styles.container}>
      <View>
        {
          payStatusList?.findIndex(item=> item.kbn ==="alipay_yn" && item.useYn === '1') > -1 ?
            <PayByAlipay isSelected={isSelected} />
            :null
        }
        {
          payStatusList?.findIndex(item=> item.kbn ==="wechat_yn" && item.useYn === '1') > -1 ?
            <PayByWechat isSelected={isSelected} />
            :null
        }
        {
          payStatusList?.findIndex(item=> item.kbn ==="unpay_yn" && item.useYn === '1') > -1 ?
            <PayByUnionPay isSelected={isSelected} />
            :null
        }
        {
          payStatusList?.findIndex(item=> item.kbn ==="unpay_yn" && item.useYn === '1') > -1 ?
            (Platform.OS === 'ios'?null:<PayByNativePay isSelected={isSelected} />)
            :null
        }
      </View>
    </Card>
  );
};


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    padding: 12,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  paycard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderColor: '#EFEFEF',
    borderBottomWidth: 1,
  },
  cardT1p: {
    width: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  cardB: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card3: {
    width: 210,
    flexDirection: 'row',
  },
  cardImg: {
    width: 30,
    height: 24,
    marginRight: 10,
    marginTop: 10,
  },
  cardT1: {
    marginBottom: 1,
    fontSize: 15,
    color: '#222',
    fontWeight: '400',
  },
  cardT2: {
    fontSize: 13,
    color: '#999',
    fontWeight: '400',
  },
  cardT23: {
    fontSize: 13,
    color: '#FC5869',
    fontWeight: '400',
    marginTop: 1,
  },
  detailLine: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginTop: 4,
    marginBottom: 4,
  },
});

export default ThirdPartyPaymentMethodContainer;
