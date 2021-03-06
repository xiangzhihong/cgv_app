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
} from 'react-native'
import MenuItem from './components/MenuItem'
import FriendCards from './components/FriendCards'
import SectionTitle from './components/SectionTitle'
import SpliteLine from './components/SpliteLine'
import ButtonListFooter from '../../common/ButtonListFooter/ButtonListFooter'
import GoodItem from '../../common/GoodItem/GoodItem'
import ShoppingCartBtn from './components/ShoppingCartBtn'
import Header from '../../common/Header/Header'
import apiRequest from "../../api";
import httpConfig from "../../api/httpConfig";
import Holder from "../../common/Holder";

const {width, height} = Dimensions.get('window')

const ShopScreen = ({navigation: {navigate}}) => {
    const [friendCards, setFriendCards] = useState([])
    const [goodList, setGoodList] = useState([])
    const [list, setList] = useState([])
    const [showAlert, setShowAlert] = useState(false)

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
        const url = '/api/shop/card';
        const res = await apiRequest.get(url);
        setFriendCards(res)
    }

    const goPressTo = () => {

    }

    const getGoodList = async () => {
        let url = '/product/good/list-all'
        let param = {
            facilityCd: 188,
            showInSelect: '1',
            ishotgoods: 1,
            pageSize: goodList?.length + 10
        };
        const res = await apiRequest.post(url, param)
        if (res != null) {
            const list = res.content.length > 0 ? res.content[0].goodList : []
            setGoodList(list)
        }
    }

    const LeftView = ({cinmaName = '?????????????????????', onHeaderLeftPress}) => {
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

    const goCardListScreen = () => {
        navigate("FriendCardListScreen")
    }

    function renderMenuView() {
        return (
            <View style={styles.menuViewStyle}>
                <MenuItem title="????????????" imgSource={require('../../assets/images/shop/menuMyOrder.png')}
                          onPress={() => goPressTo()}/>
                <MenuItem title="?????????" num={10}
                          imgSource={require('../../assets/images/shop/menuShoppingCart.png')}
                          onPress={() => navigate('MyModal', {screen: 'ShopingCartScreen'})}/>
                <MenuItem title="????????????" imgSource={require('../../assets/images/shop/menuPointsMall.png')}
                          onPress={() => {
                              navigate('MyModal', {screen: 'LoginScreen'})
                          }}/>
            </View>
        );
    }

    function renderBanner() {
        return (
            <FlatList
                data={list}
                renderItem={({item}) => <Banner key={item.id} item={item}/>}
                ItemSeparatorComponent={() => <Holder height={10}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }

    function Banner({item}) {
        return (
            <View style={{height: 250}}>
                <Image
                    source={{uri: httpConfig.mediaUrl + item?.advertImg}}
                    resizeMode="cover"
                    style={styles.bannerStyle}
                />
            </View>
        )
    }

    // function renderModel() {
    //     return (<Modal
    //         animationType="fade"
    //         transparent
    //         visible={showAlert}>
    //         <View style={styles.centeredView}>
    //             <View style={styles.modalView}>
    //                 <Image
    //                     style={{marginTop: -(width - 100) * 0.57, width: width - 100, height: (width - 100) * 0.57}}
    //                     source={require('../../assets/images/common/piao.png')}/>
    //                 <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
    //                 </View>
    //                 <Text type="subheading"
    //                       style={{marginTop: 20, marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>????????????</Text>
    //                 <Text type="label" style={{
    //                     fontSize: 16,
    //                     color: '#5e5e5e',
    //                     width: '60%',
    //                     textAlign: 'center',
    //                     lineHeight: 20,
    //                 }}>?????????????????????????????????????????????</Text>
    //                 <View
    //                     style={{flexDirection: 'row', borderTopColor: '#e5e5e5', borderTopWidth: 1, marginTop: 25}}>
    //                     <TouchableOpacity onPress={() => setShowAlert(false)} style={{
    //                         width: '50%',
    //                         alignItems: 'center',
    //                         borderRightColor: '#e5e5e5',
    //                         borderRightWidth: 1,
    //                         justifyContent: 'center',
    //                         height: 45,
    //                     }}>
    //                         <Text style={{fontSize: 15}}>????????????</Text>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity
    //                         onPress={() => {
    //                             setShowAlert(false)
    //                             if (!isLoggedIn) {
    //                                 navigate('MyModal', {screen: 'LoginScreen'})
    //                             } else {
    //                                 navigate('MyTicketsScreen')
    //                             }
    //                         }}
    //                         style={{width: '50%', alignItems: 'center', justifyContent: 'center', height: 50}}>
    //                         <Text style={{fontSize: 15, color: '#FC5869'}}>?????????</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         </View>
    //     </Modal>);
    // }

    return (
        <View>
            <Header title="??????" renderLeftView={() => <LeftView onHeaderLeftPress={onHeaderLeftPress}/>}/>
            <FlatList
                ListHeaderComponent={
                    <View>
                        {renderBanner()}
                        {renderMenuView()}
                        <FriendCards list={friendCards} seeMore={goCardListScreen}/>
                        <View style={styles.holder}/>
                        <SectionTitle title="????????????" morePress={gotoGoodList}/>
                        <SpliteLine/>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={() => {
                            getFriendCard()
                            getGoodList()
                        }}
                    />
                }
                ItemSeparatorComponent={() => <SpliteLine/>}
                ListFooterComponent={goodList.length > 10 ?
                    <ButtonListFooter content="??????????????????" onPress={() => getGoodList()} style={styles.footer}/> :
                    <View style={{height: 60}}/>}
                data={goodList}
                renderItem={({item}) => <GoodItem goBackRefresh={() => getGoodList()} item={item}/>}
                keyExtractor={item => item.id}
            />
            <ShoppingCartBtn count={10} onPress={() => {
                global.type = null
                navigate('MyModal', {screen: 'ShopingCartScreen'})
            }}/>
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
        margin: 70,
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
