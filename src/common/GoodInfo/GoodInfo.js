import React, {useEffect} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, Platform, Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {tools} from '../../utils'

const CountBtns = ({count, reduce, add}) => (
    <>
        {count > 0 &&
        <>
            <TouchableOpacity onPress={reduce}>
                <AntDesign name="minuscircle" size={21} color={'#FC5869'} style={styles.minuIconStyle}/>
            </TouchableOpacity>
            <Text style={styles.countNum}>{count}</Text>
        </>
        }
        <TouchableOpacity onPress={add}>
            <AntDesign name="pluscircle" size={21} color={'#FC5869'} style={styles.plusIconStyle}/>
        </TouchableOpacity>
    </>
)

const GoodInfo = ({
                      onLikePress, item, quantity, type, addFun, showTag,
                      showPromotionText, showCountBtnsForced, addToCart: add, removeFromCart: reduce
                  }) => {
    const [proLike, setProLike] = React.useState(null)
    const [proLikeCn, setProLikeCn] = React.useState(null)

    useEffect(() => {

    }, [])

    const onPraisePress = async (data) => {
        tools.Toast.toast(productLike === '1' ? '点赞成功' : '取消点赞', 1)
    }
    const Container = onLikePress ? TouchableOpacity : View

    return (
        <View style={styles.info}>
            <View style={styles.titleLayer}>
                {showTag ? <Text style={styles.titleType}>{item.isVirtual === '0' ? '单品' : '套餐'}</Text> : null}
                <Text style={styles.title} numberOfLines={1}>{item.productName}</Text>
                {onLikePress ? <Container onPress={() => onPraisePress(item)} style={styles.likeCount}>
                    <Image style={styles.likePic}
                           source={proLike === null && proLike === '1' ? require('../../assets/images/shop/likeRed.png') : require('../../assets/images/shop/clickinglike.png')}
                    />
                    <Text style={styles.likeNum}>{proLikeCn ? proLikeCn : item.likeCnt}</Text>
                </Container> : null}
            </View>
            <Text style={styles.detail} numberOfLines={3}>{item.detailScreen}</Text>
            <View style={styles.bottomLayer}>
                <View style={styles.prices}>
                    {showPromotionText ? <Text style={styles.promotion}>促销价：</Text> : null}
                    <Text style={styles.yuan}>¥<Text style={styles.price}>{item.price}</Text></Text>
                    <Text style={styles.taxPrice}>¥{item.priceWithTax}</Text>
                </View>
                <View style={styles.btns}>
                    {(showCountBtnsForced || item.isVirtual === '0') &&
                    <CountBtns count={quantity} reduce={() => reduce(item)} add={() => tools.Toast.toast('加入购物车', 1)}/>}
                    {(!onLikePress && !showCountBtnsForced && item.isVirtual !== '0') &&
                    <View style={styles.btnBg}><Text style={styles.btnText}>套餐换选</Text></View>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        flex: 1,
    },
    titleLayer: {
        flexDirection: 'row',
        marginTop: 2,
        marginRight: 15,
        alignItems: 'center',
    },
    titleType: {
        borderWidth: 1,
        borderColor: '#F1A23D',
        borderRadius: 2,
        fontSize: 11,
        color: '#F1A23D',
        padding: 1.5,
        marginRight: 4,
        textAlignVertical: 'center',
    },
    title: {
        fontSize: 15,
        flex: 1,
    },
    likeCount: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    likePic: {
        width: 15,
        height: 15,
        marginRight: 4,
    },
    likeNum: {
        fontSize: 13,
        color: '#989FB5',
    },
    detail: {
        marginTop: 4,
        marginRight: 15,
        fontSize: 12.5,
        color: '#989FB5',
    },
    bottomLayer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    prices: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    promotion: {
        fontSize: 13,
    },
    yuan: {
        fontSize: 11,
        color: '#FC5869',
        fontFamily: Platform.OS === 'ios' ? null : ''
    },
    price: {
        fontSize: 17,
    },
    taxPrice: {
        color: '#ccc',
        textDecorationLine: 'line-through',
        marginLeft: 5,
        fontFamily: Platform.OS === 'ios' ? null : ''
    },
    btns: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    plusIconStyle: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 14,
    },
    minuIconStyle: {
        paddingRight: 10,
        paddingLeft: 20,
        paddingTop: 2,
        paddingBottom: 14,
    },
    countNum: {
        fontSize: 13,
        color: '#FC5869',
        padding: 3,
        paddingBottom: 15,
        fontWeight: 'bold',
    },
    btnBg: {
        backgroundColor: '#FC5869',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 26,
        borderRadius: 13,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    btnText: {
        color: '#fff',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default GoodInfo;
