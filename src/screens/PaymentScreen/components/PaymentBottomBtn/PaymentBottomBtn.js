import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions} from 'react-native'
import RefundAgree from './RefundAgree'
import {goBack} from '../../../../utils/rootNavigation'
import {tools} from '../../../../utils'

const {width} = Dimensions.get('window')

const PaymentBottomBtn = ({current, placeOrder}) => {
    const ViewBtn = () => {
        return (
            <View style={styles.bodyB}>
                <View style={styles.bodyBL}>
                    <Text
                        style={styles.bodyBL1}
                        onPress={() =>
                            tools.prompt(
                                () => {
                                    return <RefundAgree/>
                                },
                                '退改签协议',
                                () => {
                                    goBack()
                                },
                            )
                        }>
                        退改签协议
                    </Text>
                    <View style={styles.bodyBLR}>
                        <Text style={styles.bodyBL2}>待支付：</Text>
                        <Text style={styles.bodyBL3}>￥{current.totalAmount}</Text>
                        <TouchableOpacity style={styles.bodyBL5} onPress={() => global.siblingPanel.destroy()}>
                            <Text style={styles.bodyBL4}>明细</Text>
                            <Image
                                style={{width: 14, height: 14}}
                                source={require('../../../../assets/images/pay/down.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    global.siblingPanel.destroy()
                    placeOrder()
                }}>
                    <Text style={styles.bodyBR}>确认支付</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.bodyB}>
            <View style={styles.bodyBL(theme)}>
                <Text
                    style={styles.bodyBL1}
                    onPress={() =>
                        tools.prompt(
                            () => {
                                return <RefundAgree/>
                            },
                            '退改签协议',
                            () => {
                                goBack()
                            },
                        )
                    }>
                    退改签协议
                </Text>
                <View style={styles.bodyBLR}>
                    <Text style={styles.bodyBL2}>待支付：</Text>
                    <Text style={styles.bodyBL3}>￥{current.totalAmount}</Text>
                    <TouchableOpacity
                        style={styles.bodyBL5}
                        onPress={() => {
                            tools.alertPanel(
                                '结算明细',
                                '',
                                [],
                                current.calcResult,
                                () => <ViewBtn/>,
                            )
                        }}
                    >
                        <Text style={styles.bodyBL4}>明细</Text>
                        <Image
                            style={{width: 14, height: 14}}
                            source={require('../../../../assets/images/pay/up.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={placeOrder}>
                <Text style={styles.bodyBR}>确认支付</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyB: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    bodyBL: {
        height: 50,
        width: width - 115,
        flexDirection: 'row',
        backgroundColor: '#3D2F2F',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignItems: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    bodyBR: {
        height: 50,
        lineHeight: 50,
        width: 115,
        textAlignVertical: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#FC5869',
        color: '#fff',
        fontSize: 15,
        fontWeight: '400',
    },
    bodyBL1: {
        color: '#fff',
        fontSize: 11,
        textDecorationLine: 'underline',
        textDecorationColor: '#999999',
    },
    bodyBLR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bodyBL2: {
        color: '#fff',
        fontSize: 11,
        marginLeft: 2,
    },
    bodyBL3: {
        color: '#FC5869',
        fontSize: 15,
        fontFamily: Platform.OS === 'ios' ? null : '',
    },
    bodyBL4: {
        color: '#fff',
        fontSize: 11,
        marginLeft: 3,
    },
    bodyBL5: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        right: 0,
        width: 76,
        height: 60,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
    },
    btnBg: {
        width: 41,
        height: 41,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    storeCarNumView: {
        backgroundColor: '#FC5869',
        borderRadius: 15,
        position: 'absolute',
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        left: 16,
        bottom: 14,
    },
    storeCarNumText: {
        color: '#fff',
        fontSize: 10,
    },
})

export default PaymentBottomBtn;
