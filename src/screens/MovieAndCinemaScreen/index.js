import React from 'react'
import {View, FlatList, Text} from 'react-native'
import CinemaItem from '../../common/CinemaItem'
import ItemSeparatorComponent from '../../common/ItemSeparator'
import Empty from '../../common/Empty'
import ListHeader from './components/ListHeader'
import apiRequest from "../../api";

const MovieAndCinemaScreen = (
    {
        navigation,
        route,
        location,
    },
) => {
    const {params} = route
    const {prMovCd} = params

    React.useEffect(() => {
        getSchedules()
    }, [])

    const [scndys, setScndys] = React.useState([])
    const [active, setActive] = React.useState(0)

    async function getSchedules() {
        let baseUrl = '/product/plans/scndayNew'
        const param = {
            prMovCd: prMovCd,
            prCityCd: 226,
            chnlNo: '05',
            pLati: 0,
            pLnti: 0,
        };
        const res = await apiRequest.get(baseUrl, param)
        setScndys(res)
    }

    const onHeaderPress = (index) => {
        setActive(index)
    }

    const renderItem = ({item, index}) => {
        const {movThats = [], movCd} = item
        return (
            movThats.length === 0 ? <View style={{height: 400}}><Empty title={'当前暂无场次~'}/></View>
                :
                movThats.map((ite, index) => {
                    let {
                        thatNm,
                        thatAddr,
                        times = [],
                        facilityGroup = '',
                        minDscAmt,
                        distance,
                        thatCd,
                        activity,
                        bktAmt,
                        cardAmt
                    } = ite
                    let rooms = facilityGroup.split(',')
                    let labels = rooms.length > 4 ?
                        rooms.slice(0, 4).map(val => ({
                            title: val,
                            type: 'movie',
                        }))
                        :
                        rooms.map(val => ({
                            title: val,
                            type: 'movie',
                        }))
                    let movieTimes = times.length > 5 ? times.slice(0, 5).map(val => val.scnFrTime).join(' | ') : times.map(val => val.scnFrTime).join(' | ')
                    let targetDistance = !distance ? '>100km' : distance > 100 ? '>100km' : `${distance.toFixed(1)}km`

                    return (
                        <CinemaItem
                            key={index.toString()}
                            onItemPress={() => navigation.navigate('SelectSessionScreen', {
                                thatCd,
                                productId: prMovCd, ...ite,
                                movieActiveIndex: active
                            })}
                            labels={labels}
                            name={thatNm}
                            addr={thatAddr && thatAddr.length > 25 ? thatAddr.slice(0, 25) + '...' : thatAddr}
                            note={`近期场次：${movieTimes}`}
                            rightStyle={{justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 8}}
                            centerTextStyle={{textAlign: 'right', marginTop: 10}}
                            centerText={<Text  style={{color: '#FEAE04'}}>
                                {activity === '0' ?
                                    (cardAmt > 0 && cardAmt < bktAmt ? cardAmt : bktAmt)
                                    :
                                    (minDscAmt > 0 && minDscAmt < cardAmt) ? minDscAmt : (cardAmt > 0 && cardAmt < bktAmt ? cardAmt : bktAmt)
                                }元<Text
                                style={{marginLeft: 3}}> 起</Text> </Text>}
                            renderInfo={() => <Text>{targetDistance}</Text>}/>
                    )
                })
        )
    }

    const {scnDays} = scndys[active] || {}
    return (
        <FlatList
            ListHeaderComponent={() => <ListHeader activeIndex={active} list={scndys} onPress={onHeaderPress}/>}
            data={scnDays}
            ItemSeparatorComponent={() => <ItemSeparatorComponent/>}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListFooterComponent={() =>
                scnDays && scnDays.length === 0 ? <View style={{height: 400}}><Empty title={'当前暂无场次~'}/></View> : null
            }
        />
    )
}

export default MovieAndCinemaScreen;


