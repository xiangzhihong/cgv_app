import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions, Modal,
} from 'react-native';
import {tools} from '../../utils';
import GoodItem from '../../common/GoodItem/GoodItem';
import ShoppingCartBar from '../GoodListScreen/components/ShoppingCartBar';
import Holder from '../../common/Holder';


const {width, height} = Dimensions.get('window')

const ShopingCart = ({
                         navigation: {goBack, navigate},
                         items,
                         route,
                         state,
                         isLoggedIn,
                         cartTotalQuantity,
                         cartTotalAmount,
                         resetCheckoutProductState: _resetCheckoutProductState,
                         createTicketOrder: _createTicketOrder,
                         updateOrderStatus: _updateOrderStatus,
                     }) => {


    const confirmClearCart = () => {
        tools.confirm(
            '购物车清空后无法恢复\n确认清空购物车？',
            undefined,
            () => {
                _resetCheckoutProductState();
                goBack();
                goBack();
            },
            '清空',
        );
    };

    const createGoodOrder = async () => {
        if (isLoggedIn) {
            if (arr.length < 1) {
                tools.alert('购物车不能为空！', '', [
                    {
                        text: '确定',
                        onPress: () => {
                            goBack();
                            // global.siblingAlert.destroy();
                        },
                    },
                ]);
            } else {
                tools.loading();
                _createTicketOrder(obj);
            }
        } else {
            goBack()
            navigate('MyModal', {screen: 'LoginScreen'});
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.holder}/>
            <View style={styles.box}>
                <View style={styles.titleLayer}>
                    <Text style={styles.selected}>已选商品</Text>
                    <TouchableOpacity onPress={() => confirmClearCart()}>
                        <Text style={styles.clearAll}>清空购物车</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={items}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <GoodItem
                            showTag={false}
                            item={item}
                            canGoDetail={false}
                            showCountBtnsForced
                        />
                    )}
                    ListFooterComponent={() => <Holder height={80}/>}
                    ListEmptyComponent={() => (
                        <TouchableOpacity onPress={goBack}>
                            <Text style={styles.empty}>您还没有选购商品呢，快去选购吧～</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <ShoppingCartBar
                amount={cartTotalAmount}
                num={cartTotalQuantity}
                onPressLeft={goBack}
                onPressRight={() => global.type === 'movie' ? goBack() : createGoodOrder()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    holder: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    box: {
        height: height * 0.6,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    titleLayer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selected: {
        fontSize: 15,
        color: '#222',
        marginHorizontal: 15,
        marginVertical: 12,
    },
    clearAll: {
        fontSize: 13,
        color: '#777',
        paddingVertical: 12,
        paddingLeft: 30,
        paddingRight: 15,
    },
    empty: {
        color: '#ccc',
        textAlign: 'center',
        flex: 1,
        marginTop: 100,
        padding: 50,
    },
});


export default ShopingCart;
