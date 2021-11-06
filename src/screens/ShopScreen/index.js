import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
    RefreshControl,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    Modal,
} from 'react-native'
import MenuItem from './components/MenuItem'
import FriendCards from './components/FriendCards'
import AdvertisingBanner from '../../common/AdvertisingBanner/AdvertisingBanner'
import SectionTitle from './components/SectionTitle'
import SpliteLine from './components/SpliteLine'
import ButtonListFooter from '../../common/ButtonListFooter/ButtonListFooter'
import GoodItem from '../../common/GoodItem/GoodItem'
import ShoppingCartBtn from './components/ShoppingCartBtn'
import {bizstream} from '../../bizstream'
import {navigate, tools} from '../../utils'
import Header from '../../common/Header/Header'
import apiRequest from "../../api";
import Swiper from "react-native-swiper";
import httpConfig from "../../api/httpConfig";
import Holder from "../../common/Holder";

const {width, height} = Dimensions.get('window')

const ShopScreen = ({
                        route,
                        position: _position,
                        selectedCinema = '',
                        navigation: {navigate},
                        addToCart: _addToCart,
                        isLoggedIn,
                        cartTotalQuantity,
                        thatCd,
                        facilityId
                    }) => {
    const [friendCards, setFriendCards] = useState([])
    const [goodList, setGoodList] = useState([])
    const [total, setTotal] = useState([])
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    global.type = null

    useEffect(() => {
        getBannerList()
        getFriendCard()
        getGoodList()
    }, [])

    async function getBannerList() {
        const url =
            'https://prd-api.cgv.com.cn/content/api/advert/query?channel=APP&advertType=APP_SHOP_HEAD_AD&thatCd=';
        const data = await apiRequest.get(url);
        setList(data || []);
    }

    async function getFriendCard() {
        const url = 'http://prd-api.cgv.com.cn/api/shop/card';
        const res = await apiRequest.get(url);
        setFriendCards(res)
    }

    const findHasGoodsCoupon = async () => {
        try {
            const {code, data} = await bizstream.customer.findHasGoodsCoupon()
            if (code === 200) {
                if (data.data) {
                    setShowAlert(true)
                }
            }
        } catch (e) {
            tools.Toast.toast('获取失败，请稍后再试！', 1)
        }
    }

    const goPressTo = () => {

    }

    const getGoodList = async () => {
        let productCategoryTypeId = 2
        try {
            const res = await bizstream.admin.getFeaturedProducts(facilityId, productCategoryTypeId, goodList?.length + 10)
            if (res.code === 200) {
                const list = res?.data?.content?.length > 0 ? res?.data?.content[0]?.goodList : []
                setGoodList(list)
                setTotal(res.data.totalPages)
            } else {
                throw new Error(res)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const LeftView = ({cinmaName = '上海大宁电影城', onHeaderLeftPress}) => {
        return (
            <TouchableOpacity style={styles.leftContainer} onPress={() => onHeaderLeftPress()}>
                <Image source={require('../../assets/images/promotion/address.png')} style={styles.addressImg}/>
                <Text numberOfLines={1} style={styles.name}>{cinmaName}</Text>
            </TouchableOpacity>
        )
    }

    const onHeaderLeftPress = () => {
        navigate("CitySelectScreen")
    }

    const gotoGoodList = () => navigate('GoodListScreen')

    function renderMenuView() {
        return (
            <View style={styles.menuViewStyle}>
                <MenuItem title="我的订单" imgSource={require('../../assets/images/shop/menuMyOrder.png')}
                          onPress={() => goPressTo()}/>
                <MenuItem title="购物车" num={cartTotalQuantity}
                          imgSource={require('../../assets/images/shop/menuShoppingCart.png')}
                          onPress={() => navigate('MyModal', {screen: 'ShopingCartScreen'})}/>
                <MenuItem title="积分商城" imgSource={require('../../assets/images/shop/menuPointsMall.png')}
                          onPress={() => {
                              if (!isLoggedIn) {
                                  navigate('MyModal', {screen: 'LoginScreen'})
                              } else {
                                  navigate('IntegralMallScreen')
                              }
                          }}/>
            </View>
        );
    }

    function renderBanner() {
        return (
            <FlatList
                data={list}
                renderItem={({ item }) => <Banner key={item.id} item={item}/>}
                ItemSeparatorComponent={() => <Holder height={10} />}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }

    function Banner({item}) {
        return (
            <View style={{height :250}}>
                <Image
                    source={{ uri: httpConfig.mediaUrl + item?.advertImg }}
                    resizeMode="cover"
                    style={styles.bannerStyle}
                />
            </View>
        )
    }

    return (
        <View>
            <Header title="商店" renderLeftView={() => <LeftView onHeaderLeftPress={onHeaderLeftPress}/>}/>
            <FlatList
                ListHeaderComponent={
                    <View>
                        {renderBanner()}
                        {renderMenuView()}
                        <FriendCards list={friendCards} seeMore={() => navigate('FriendCardListScreen')}/>
                        <View style={styles.holder}/>
                        <SectionTitle title="人气商品" morePress={gotoGoodList}/>
                        <SpliteLine/>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={() => {
                            setIsLoading(true)
                            getFriendCard()
                            getGoodList()
                            findHasGoodsCoupon()
                            setTimeout(() => {
                                setIsLoading(false)
                            }, 500)
                        }}

                    />
                }
                ItemSeparatorComponent={() => <SpliteLine/>}
                ListFooterComponent={goodList.length > total * 10 ?
                    <ButtonListFooter content="查看更多商品" onPress={() => getGoodList()} style={styles.footer}/> :
                    <View style={{height: 60}}/>}
                data={goodList}
                renderItem={({item}) => <GoodItem addOrder={_addToCart} goBackRefresh={() => getGoodList()} type='goods'
                                                  isLoggedIn={isLoggedIn} item={item} showPromotionText showTag/>}
                keyExtractor={item => item.id}
            />
            <ShoppingCartBtn count={cartTotalQuantity} onPress={() => {
                global.type = null
                navigate('MyModal', {screen: 'ShopingCartScreen'})
            }}/>
            <Modal
                animationType="fade"
                transparent
                visible={showAlert}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={{marginTop: -(width - 100) * 0.57, width: width - 100, height: (width - 100) * 0.57}}
                            source={require('../../assets/images/common/piao.png')}/>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        </View>
                        <Text type="subheading"
                              style={{marginTop: 20, marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>温馨提示</Text>
                        <Text type="label" style={{
                            fontSize: 16,
                            color: '#5e5e5e',
                            width: '60%',
                            textAlign: 'center',
                            lineHeight: 20,
                        }}>您有尚未使用的优惠券记得用哦～</Text>
                        <View
                            style={{flexDirection: 'row', borderTopColor: '#e5e5e5', borderTopWidth: 1, marginTop: 25}}>
                            <TouchableOpacity onPress={() => setShowAlert(false)} style={{
                                width: '50%',
                                alignItems: 'center',
                                borderRightColor: '#e5e5e5',
                                borderRightWidth: 1,
                                justifyContent: 'center',
                                height: 45,
                            }}>
                                <Text style={{fontSize: 15}}>先不用了</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowAlert(false)
                                    if (!isLoggedIn) {
                                        navigate('MyModal', {screen: 'LoginScreen'})
                                    } else {
                                        navigate('MyTicketsScreen')
                                    }
                                }}
                                style={{width: '50%', alignItems: 'center', justifyContent: 'center', height: 50}}>
                                <Text style={{fontSize: 15, color: '#FC5869'}}>去看看</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuViewStyle: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 97,
        marginTop: -20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    holder: {
        height: 10,
    },
    footer: {
        marginBottom: 60,
    },
    leftContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    addressImg: {
        height: 18,
        width: 18,
    },
    name: {
        color: '#222',
        fontSize: 15,
        width: 110,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalView: {
        margin: 50,
        backgroundColor: 'white',
        borderRadius: 6,
        alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    bannerStyle: {
        height: 250,
        borderRadius: 6,
    },
    dotStyle: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: 4,
        height: 4,
        borderRadius: 4,
    },
    activeDotStyle: {
        backgroundColor: '#fff',
        width: 4,
        height: 4,
        borderRadius: 4,
    },
    paginationStyle: {
        bottom: 5,
    }
})


export default ShopScreen;
