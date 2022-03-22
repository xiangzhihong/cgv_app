import React, {useEffect, useState} from 'react'
import {StyleSheet, View, ImageBackground, TouchableOpacity, Text, ScrollView, Platform} from 'react-native'
import {tools} from '../../utils'
import PopAgreement from './components/PopAgreement'
import httpConfig from "../../api/httpConfig";
import apiRequest from "../../api";
import ownCard from "../../mock/ownCard.json";
import aviailabCards from "../../mock/aviailableCard.json";

const FriendCardDetailScreen = ({route}) => {
    const { item, status } = route.params || {}
    const [selectedIndex, setSelectedIndex] = useState(0)
    // const [aviailabCards, setAviailabCards] = useState([])
    // const [ownCards, setOwnCards] = useState({})

    useEffect(() => {
        // getOwnCards()
        // getAvailableCards()
    }, [])

    const getOwnCards = async () => {
        let url = '/api/shop/card/czk/1095/G003150'
        const res = await apiRequest.get(url)
        setOwnCards(res.data)
    }

    const getAvailableCards = async () => {
        let url = '/api/shop/card/all/1095'
        const res = await apiRequest.get(url)
        if (res) {
            const index = data.findIndex(d => d.id === item.id)
            setAviailabCards(data)
            setSelectedIndex(index)
        }
    }


    const CardInstruction = ({item}) => (
        <View style={styles.cardExplainBox}>
            <View style={[styles.cardPrivileges, styles.marginBox]}>
                <Text style={styles.cardTitle}>持卡特权</Text>
                <Text style={styles.cardExplain}>{item.product.description}</Text>
            </View>
            <View style={[styles.marginBox]}>
                <Text style={styles.cardTitle}>使用说明</Text>
                <Text style={styles.cardExplain}>{item.product.longDescription}</Text>
            </View>
        </View>
    )

    const CardInfo = (ownCard) => {
        return (
            <View style={[styles.cardBox]}>
                <ImageBackground source={{uri: httpConfig.mediaUrl + ownCard.item.data.largeImageUrl}} style={styles.cardImg}/>
                <Text style={styles.friendCardName}>{ownCard.item.data.productName}</Text>
                <Text style={styles.friendCardContent}>{ownCard.item.data.description}</Text>
            </View>
        )
    }

    const showAgreement = () => tools.alert(() => <PopAgreement/>, '线上朋友卡购卡协议/服务须知')
    const selectedItem = aviailabCards[selectedIndex]

    const Btns = () => (
        <View style={styles.btnLayer}>
            {
                ['赠送朋友', '立即办卡', '立即续卡'].map((ite, index) => (
                    <TouchableOpacity key={index} style={styles.buttonBox} onPress={() => {
                        if (index === 0) {
                            navigate('MyFriendCardDetailScreen', {status: index, item: selectedItem})
                        } else if (index === 2) {
                            navigate('ModalCGVCheckPayScreen', {
                                items: ownCards,
                                confirm: (data) => navigate('FriendCardPayScreen', {
                                    status: 2,
                                    mbrCrdNo: data,
                                    item: selectedItem
                                }),
                                status: 7,
                                title: '选择您要续的朋友卡',
                                footerText: '提示：只能选择一张朋友卡',
                                addCard: false,
                                mepty: '您还没有朋友卡～'
                            })
                        } else {
                            navigate('FriendCardPayScreen', {status: index, item: selectedItem})
                        }
                    }}>
                        <Text
                            style={[[styles.giveFriend, styles.cardImmediately, styles.immediateRenewal][index], styles.paddingBox]}>{ite}</Text>
                    </TouchableOpacity>
                ))

            }
        </View>
    )

    const Card = ({item, checked, select}) => (
        <TouchableOpacity onPress={() => {
            select()
            // getOwnCards()
        }}>
            <View style={[styles.eCardBox, checked && styles.eCardCheckedBox]}>
                <View style={[styles.eCardName, checked && styles.eCardCheckedName]}>
                    <Text style={styles.name}>{item.productName}</Text>
                </View>
                <View style={styles.priceLayer}>
                    <Text style={[styles.presentPriceSymbol, checked && styles.checkedColor]}>¥<Text
                        style={styles.presentPrice}>{item.price + item.taxAmount}</Text></Text>
                    <Text style={styles.originalPrice}>¥{item.productRating}</Text>
                </View>
                <Text style={styles.termOfValidity}>{item.priceDetailText}</Text>
                {
                    checked &&
                    <ImageBackground style={styles.checkedImg}
                                     source={require('../../assets/images/shop/checked.png')}/>
                }
            </View>
        </TouchableOpacity>
    )

    const CardList = ({list, select}) => {
        if(list){
           return  (
               <View style={styles.eCardsBox}>
                   {list.map((ite, index) =>
                       <Card
                           key={index}
                           item={ite}
                           checked={index === selectedIndex}
                           select={() => select(index)}/>)}
               </View> )
        }else {
            return <View/>
        }
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                {<CardInfo item={ownCard}/>}
                <CardList list={aviailabCards.data} select={setSelectedIndex}/>
                {/*{selectedItem && <CardInstruction item={selectedItem}/>}*/}
                <View style={styles.startCard}>
                    <Text style={styles.startCardLeft}>开卡代表接受</Text>
                    <TouchableOpacity onPress={showAgreement}>
                        <Text style={styles.startCardRight}>《CGV影城朋友卡协议》</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Btns/>
        </View>
    )
}

const styles = StyleSheet.create({
    cardBox: {
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    name: {
        color: '#fff',
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? null : ''
    },
    priceLayer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginLeft: 16,
        marginTop: 10,
    },
    cardImg: {
        width: 160,
        height: 100,
        marginBottom: 18,
        alignSelf: 'center',
    },
    friendCardName: {
        color: '#333333',
        fontSize: 18,
        marginBottom: 8,
    },
    friendCardContent: {
        color: '#999999',
        fontSize: 13,
        lineHeight: 18,
    },
    startCard: {
        marginTop: 10,
        marginBottom: 60,
        paddingVertical: 10,
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    startCardLeft: {
        color: '#999999',
        fontSize: 12,
    },
    startCardRight: {
        color: '#389AFC',
        fontSize: 12,
    },
    buttonBox: {
        flex: 1,
        justifyContent: 'center',
    },
    giveFriend: {
        color: '#FC5869',
        fontSize: 16,
    },
    cardImmediately: {
        backgroundColor: '#F1A23D',
        color: '#fff',
        fontSize: 16,
    },
    immediateRenewal: {
        backgroundColor: '#FC5869',
        color: '#fff',
        fontSize: 16,
    },
    paddingBox: {
        paddingVertical: 14,
        textAlign: 'center',
    },
    eCardsBox: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    eCardBox: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 10,
        paddingBottom: 10,
    },
    eCardCheckedBox: {
        borderColor: '#FC5869',
    },
    eCardName: {
        backgroundColor: '#CCCCCC',
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eCardCheckedName: {
        backgroundColor: '#FC5869',
    },
    presentPriceSymbol: {
        fontSize: 14,
        color: '#777',
        fontFamily: 'Avenir',
    },
    presentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkedColor: {
        color: '#FC5869',
    },
    originalPrice: {
        fontSize: 14,
        color: '#CCCCCC',
        marginLeft: 8,
        textDecorationLine: 'line-through',
        fontFamily: 'Avenir',
    },
    termOfValidity: {
        color: '#999999',
        fontSize: 12,
        marginTop: 4,
        marginHorizontal: 16,
    },
    checkedImg: {
        position: 'absolute',
        width: 32,
        height: 32,
        bottom: 0,
        right: 0,
    },
    cardExplainBox: {
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginTop: 10,
    },
    marginBox: {
        paddingVertical: 15,
    },
    cardPrivileges: {
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#222222',
        fontSize: 14,
        marginBottom: 10,
    },
    cardExplain: {
        color: '#777777',
        fontSize: 13,
        lineHeight: 18,
    },
    btnLayer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'e5e5e5',
    },
})

export default FriendCardDetailScreen;
