import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, Platform} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Card from '../../../../common/Card/Card';
import {UPPay, aliPay, Wxpay} from '../../../../nativeBridge/pay';
import apiRequest from "../../../../api";
import thirdPay from "../../../../mock/thirdPay.json";

const ThirdPaymentContainer = () => {
    const [isSelected, setIsSelected] = useState(2);
    const [payList, setPayList] = useState([]);

    useEffect(() => {
        payAttrFun()
    }, []);


    const payAttrFun = async () => {
        let baseUrl = '/facility/attr/188'
        const res = await apiRequest.get(baseUrl)
        console.log(res)
        setPayList(res)
    }

    const PayByAlipay = () => {
        return (
            <TouchableOpacity
                style={styles.payCard}
                onPress={() => {
                    setPayCode(2);
                }}>
                <View style={styles.cardContain}>
                    <Image
                        style={styles.cardImg}
                        source={require('../../../../assets/images/pay/alipay.png')}/>
                    <View>
                        <Text style={styles.cardNam}>支付宝支付</Text>
                        <Text style={styles.cardDes}>推荐支付宝用户使用</Text>
                    </View>
                </View>
                <View style={styles.cardTip}>
                    <AntDesign
                        name={isSelected === 2 ? 'checkcircle' : 'checkcircleo'}
                        size={18}
                        color={isSelected === 2 ? '#F1A23D' : '#dddddd'}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const PayByWechat = () => {
        return (
            <TouchableOpacity
                style={styles.payCard}
                onPress={() => {
                    setPayCode(1);
                }}>
                <View style={styles.cardContain}>
                    <Image
                        style={styles.cardImg}
                        source={require('../../../../assets/images/pay/wechatpay.png')}
                    />
                    <View>
                        <Text style={styles.cardNam}>微信支付</Text>
                        <Text style={styles.cardDes}>亿万用户的选择，更快更安全</Text>
                    </View>
                </View>
                <View style={styles.cardTip}>
                    <AntDesign
                        name={isSelected === 1 ? 'checkcircle' : 'checkcircleo'}
                        size={18}
                        color={isSelected === 1 ? '#F1A23D' : '#dddddd'}
                    />
                </View>
            </TouchableOpacity>
        );
    };


    const PayByUnionPay = () => {
        return (
            <TouchableOpacity
                style={[styles.payCard, {borderBottomWidth: 0}]}
                onPress={() => {
                    setPayCode(3);
                }}>
                <View style={styles.cardContain}>
                    <Image
                        style={styles.cardImg}
                        source={require('../../../../assets/images/pay/cloudpay.png')}
                    />
                    <View>
                        <Text style={styles.cardNam}>云闪付</Text>
                        <Text style={styles.cardDes}>推荐云闪付用户使用</Text>
                    </View>
                </View>
                <View style={styles.cardTip}>
                    <AntDesign
                        name={isSelected === 3 ? 'checkcircle' : 'checkcircleo'}
                        size={18}
                        color={isSelected === 3 ? '#F1A23D' : '#dddddd'}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const setPayCode = (index) => {
        setIsSelected(index);
    };

    return (
        <Card style={styles.container}>
            <View style={styles.detailLine}/>
            <View>
                {
                    payList?.findIndex(item => item.kbn === "alipay_yn") > -1 ?
                        <PayByAlipay isSelected={isSelected}/>
                        : null
                }
                {
                    payList?.findIndex(item => item.kbn === "wechat_yn") > -1 ?
                        <PayByWechat isSelected={isSelected}/>
                        : null
                }
                {
                    payList?.findIndex(item => item.kbn === "unpay_yn") > -1 ?
                        <PayByUnionPay isSelected={isSelected}/>
                        : null
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
    payCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderColor: '#EFEFEF',
        borderBottomWidth: 1,
    },
    cardTip: {
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
    cardContain: {
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
    cardNam: {
        marginBottom: 1,
        fontSize: 15,
        color: '#222',
        fontWeight: '400',
    },
    cardDes: {
        fontSize: 13,
        color: '#999',
        fontWeight: '400',
    },
    detailLine: {
        height: 1,
        backgroundColor: '#EFEFEF',
    },
});

export default ThirdPaymentContainer;
