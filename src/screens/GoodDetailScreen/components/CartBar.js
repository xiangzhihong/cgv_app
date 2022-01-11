import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Badge from '../../../common/Badge'

const CartBar = ({
                     num = 0, onPressLeft = () => {
    }, onPressRight = () => {
    }
                 }) => (
    <View style={styles.bar}>
        <TouchableOpacity style={styles.left} onPress={onPressLeft}>
            <Badge imgSource={require('../../../assets/images/shop/shoppingcart.png')} size="small"
                   style={styles.cartBadge}/>
            <Text style={styles.cart}>购物车</Text>
            <View style={styles.numView}>
                <Text style={styles.numText}>{num}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.right} onPress={onPressRight}>
            <Text style={styles.ok}>选好了</Text>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    bar: {
        height: 48,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: '#e5e5e5',
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC5869',
    },
    cartBadge: {
        height: 17,
        width: 17,
    },
    cart: {
        marginLeft: 6,
        marginRight: 4,
    },
    ok: {
        fontSize: 15,
        color: '#fff',
    },
    numView: {
        backgroundColor: '#FC5869',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 8,
        width: 16,
        height: 16,
    },
    numText: {
        color: '#fff',
        fontSize: 10,
    },
})

export default CartBar
