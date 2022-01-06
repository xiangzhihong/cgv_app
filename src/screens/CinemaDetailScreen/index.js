import React from 'react'
import {View, StyleSheet, Linking, Button, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import ListItem from '../../common/ListItem'
import Bottom from './components/ViewList'
import apiRequest from "../../api";

const CinemaDetailScreen = (
    {
        route,
        navigation,
    },
) => {
    const {params = {}} = route
    const {thatCd} = params
    const [detail, setDetail] = React.useState({})

    React.useEffect(() => {
        getCinemaDetail()
    }, [])

    async function getCinemaDetail() {
        let url = '/product/thats/' + thatCd
        const res = await apiRequest.get(url)
        console.log('getCinemaDetail: ' + res)
        setDetail(res)
    }

    const {
        other,
        thatNm,
        parking,
        eyes3d,
        selfHelp,
        specScreens = [],
        surroundingCatering,
        wifi,
        childReductions,
        traficInfo
    } = detail

    return (
        <ScrollView>
            {thatNm ? <ListItem isTitle={true} text={thatNm}/> : null}
            <ListItem onPress={() => navigation.navigate('MapScreen', detail)} text={detail?.thatAddr}
                      renderIcon={() => <EvilIcons name="location" size={20} color="#999"/>}
                      renderRight={() => <Icon name="chevron-thin-right" size={16} color="#ccc"/>}/>
            <ListItem text={detail?.houseNumber} onPress={() => {
                const tel = `tel:${detail?.houseNumber}`
                Linking.canOpenURL(tel).then((supported) => {
                    if (!supported) {
                    } else {
                        return Linking.openURL(tel)
                    }
                }).catch(error => console.log('tel error', error))
            }} isLast renderIcon={() => <SimpleLineIcons style={{marginRight: 4}} name="phone" size={13}
                                                         color="#999"/>} renderRight={() =>
                <Icon name="chevron-thin-right" size={16} color="#ccc"/>}/>
            <ListItem text="特色服务" isTitle style={{marginTop: 10}}/>
            <ListItem text="购买朋友卡享受购票优惠" label="朋友卡"
                      renderRight={() => <Button onPress={() => navigation.navigate('FriendCardListScreen')}
                                                 textStyle={{fontSize: 13, color: '#777'}}
                                                 style={[styles.button, {
                                                     backgroundColor: '#fff',
                                                     borderColor: '#e5e5e5'
                                                 }]} title="详情"/>}/>
            <ListItem text="支持线上购买观影小食" label="观影小食" renderRight={() => <Button
                onPress={() => navigation.navigate('GoodListScreen', {
                    update: () => {
                    }
                })} textStyle={{fontSize: 13, color: '#777'}} style={[styles.button, {
                backgroundColor: '#fff',
                borderColor: '#e5e5e5',
            }]} title="详情"/>}/>
            {
                specScreens.length > 0 ?
                    <ListItem text={specScreens?.map(item => item.specScreenName).join('、')} label="特效厅"/> : null
            }
            {
                selfHelp ? <ListItem text={selfHelp} label="自助取票" labelType="other"/> : null
            }
            {
                parking ? <ListItem text={parking} label="停车场" labelType="other"/> : null
            }
            {
                traficInfo ? <ListItem text={traficInfo} label="交通便利" labelType="other"/> : null
            }
            {
                surroundingCatering ? <ListItem text={surroundingCatering} label="周边餐饮" labelType="other"/> : null
            }
            {
                childReductions ? <ListItem text={childReductions} label="儿童优惠" labelType="other"/> : null
            }
            {
                eyes3d ? <ListItem text={eyes3d} label="3D眼镜" labelType="other"/> : null
            }
            {
                wifi ? <ListItem text={wifi} label="Wi-Fi" labelType="other"/> : null
            }
            {
                other ? <ListItem text={other} label="其他" labelType="other"/> : null
            }
            <Bottom images={detail?.facilityImgs} onImagePress={(index) => {
                navigation.navigate('CinemaDetailScreenPic', {
                    active: index,
                    images: detail?.facilityImgs?.split(','),
                    title: '影院图片'
                })
            }}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingVertical: 12,
        marginTop: 10,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
    },
})

export default CinemaDetailScreen
