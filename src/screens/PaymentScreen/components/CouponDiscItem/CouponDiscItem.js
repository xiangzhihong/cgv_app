import React from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import SectionHeader from '../../../../common/SectionHeader'
import {navigate} from '../../../../utils'

const {width} = Dimensions.get('window')

const CouponDiscItem = ({
                            current,
                            getDscResult: _getDscResult,
                            getUsableCouponsAndCardsForSchedule: _getUsableCouponsAndCardsForSchedule
                        }) => {

    return (
        <View>
            <SectionHeader title="优惠券" isRenderRight isRenderButton onClick={() => navigate('ModalCGVPayScreen', {
                confirm: (data) => _getDscResult(data),
                status: 1,
                title: '使用优惠券',
                addCardTitle: '添加优惠券',
                mepty: '您还没有优惠券～'
            })}/>
            {current?.ticketOrder?.ticketTotal?.details?.map((item, index) => (
                item.dsc_type === 'coupon' && item.dsc_auth_no ?
                    <View style={styles.discountLine} key={index}>
                        <Text type='subheading' style={styles.discountName}>{item.dsc_name}</Text>
                        <Text type='bodyheading' style={styles.discountAmount}>-￥{item.dsc_price}</Text>
                    </View>
                    : null
            ))}
            <View style={styles.detailLine}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    sectionTitle: {
        color: '#222',
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
    detailLine: {
        width: width - 22,
        height: 1.5,
        backgroundColor: '#EFEFEF',
        left: -10,
        marginTop: 10,
        marginBottom: 10,
    },
    detailBottom: {
        width: '100%',
        position: 'relative',
        justifyContent: 'flex-start',
        paddingRight: 12
    },
    detailBottomText1: {
        lineHeight: 44,
        color: '#222',
        width: 45,
        textAlign: 'left',
    },
    detailBottomText2: {
        lineHeight: 44,
        color: '#222',
    },
    detailBottomText3: {
        lineHeight: 42,
        color: '#222',
    },
    topicImg: {
        width: 100,
        height: 142,
        borderRadius: 3,
        overflow: 'hidden'
    },
    input: {
        width: '67%',
        height: 46,
        backgroundColor: '#fff',
        padding: 0,
        paddingBottom: 0,
    },
    iconContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftIconContainer: {
        marginEnd: 12,
    },
    rightIconContainer: {
        marginStart: 8,
    },

    headerView: {
        width: width,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    leftIcon: {
        width: 15,
        height: 13,
        marginLeft: 15,
        marginRight: 5
    },
    rowdata: {
        width: width,
        height: 30,
        backgroundColor: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:12,
    },
    moreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        color: '#999',
    },
    rightIcon: {
        color: '#ccc',
        fontSize: 15,
    },
})


export default CouponDiscItem
