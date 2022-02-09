import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Card from '../../../../common/Card/Card'
import SectionHeader from '../../../../common/SectionHeader'
import {navigate} from '../../../../utils'

const VoucherContainer = ({current, getDscResult: _getDscResult,}) => {
    return (
        <Card type="clear" style={styles.container}>
            <View>
                <SectionHeader title="代金券(兑换券、观摩券、观影券)" isRenderRight onClick={() => navigate('ModalCGVPayScreen', {
                    confirm: (data) => _getDscResult(data),
                    status: 4,
                    seats: current.ticketOrder.ticket.seats,
                    title: '使用代金券',
                    mepty: '您还没有代金券～',
                    addCardTitle: '添加代金券',

                })}/>
                {current.ticketOrder && current.ticketOrder.ticketTotal && current.ticketOrder.ticketTotal.details && current.ticketOrder.ticketTotal.details.length > 0 ?
                    current.ticketOrder.ticketTotal.details.map((item, index) => (
                        item.dsc_type === 'voucher' ? <View style={styles.discountLine} key={index}>
                            <Text type='subheading' style={styles.discountName}>{item.dsc_name}</Text>
                            <Text type='bodyheading' style={styles.discountAmount}>-￥{item.dsc_price}</Text>
                        </View> : null
                    )) : null}
            </View>
        </Card>
    )
}


const styles = StyleSheet.create({
    container: {
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
        color: '#999',
    },
    rightIcon: {
        color: '#ccc',
        fontSize: 15,
    },
})

export default VoucherContainer;
