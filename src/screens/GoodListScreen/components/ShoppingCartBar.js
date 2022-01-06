import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native'
import Badge from '../../../common/Badge'

const ShoppingCartBar = ({ amount = '0.0', num = 0, onPressLeft = () => {}, onPressRight = () => {}}) => (
    <View style={styles.bar}>
        <TouchableOpacity style={styles.left} onPress={onPressLeft}>
            <Badge imgSource={require('../../../assets/images/shop/shoppingcart.png')} num={num} size="small"
                   style={styles.cart}/>
            <Text>商品总价：</Text>
            <Text style={styles.total}>¥<Text style={styles.amount}>{amount}</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.right} onPress={onPressRight}>
            <Text style={styles.balanceAccounts}>去结算</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    bar: {
        height: 48,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    right: {
        flex: 1,
        backgroundColor: '#FC5869',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cart: {
        marginHorizontal: 15,
    },
    balanceAccounts: {
        fontSize: 15,
        backgroundColor: '#fff'
    },
    total: {
        backgroundColor: '#FC5869',
        fontSize: 11,
        fontFamily: Platform.OS === 'ios' ? null : ''
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 18,
    },
})

export default ShoppingCartBar
