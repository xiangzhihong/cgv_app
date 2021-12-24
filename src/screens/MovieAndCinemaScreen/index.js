import React from 'react'
import { View,  FlatList,Text } from 'react-native'
import CinemaItem from '../../common/CinemaItem'
import Empty from '../../common/Empty'
import ItemSeparatorComponent from '../../common/ItemSeparator'
import ListHeader from './components/ListHeader'
// import { bizstream } from '../../bizstream'

const MovieAndCinemaScreen = (
  {
    navigation,
    route,
    location,
  },
) => {

  const { params } = route
  const { prMovCd } = params

  React.useEffect(() => {
    _getSchedules()
  }, [])

  const [scndys, setScndys] = React.useState([])
  const [active, setActive] = React.useState(0)
  const [status, setStatus] = React.useState('LOADING')

  const _getSchedules = async (movCd) => {
    try {
      const { latitude, longitude } = location
      const res = await bizstream.admin.getSchedulesByCity(prMovCd, latitude, longitude)
      if (res.code === 200) {
        setScndys(res.data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setStatus('SUCCESS')
    }
  }

  const onHeaderPress = (index) => {
    setActive(index)
  }

  const renderItem = ({ item, index }) => {
    const { movThats = [], movCd } = item
    return (
      movThats.length === 0 ? <View style={{ height: 400 }}><Empty title={'当前暂无场次~'}/></View>
        :
        movThats.map((ite, index)=> {
          let { thatNm, thatAddr, times = [], srmCd, facilityGroup = '', facilityImgs, minDscAmt, distance, thatCd, activity, bktAmt, cardAmt } = ite
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
              rightStyle={{ justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 8 }}
              centerTextStyle={{ textAlign: 'right', marginTop: 10 }}
              centerText={<Text type="heading" bold
                                style={{ color: '#FEAE04' }}>
                {activity === '0' ?
                  (cardAmt > 0 && cardAmt < bktAmt ? cardAmt : bktAmt)
                  :
                  (minDscAmt > 0 && minDscAmt < cardAmt) ? minDscAmt : (cardAmt > 0 && cardAmt < bktAmt ? cardAmt : bktAmt)
                }元<Text
                style={{ marginLeft: 3 }}> 起</Text> </Text>}
              renderInfo={() => <Text>{targetDistance}</Text>}/>
          )
        })
    )
  }

  const { scnDays } = scndys[active] || {}
  return (
    <GenericTemplate scrollable={false} status={status}>
      <FlatList
        ListHeaderComponent={() => <ListHeader activeIndex={active} list={scndys} onPress={onHeaderPress}/>}
        data={scnDays}
        ItemSeparatorComponent={() => <ItemSeparatorComponent/>}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListFooterComponent={() =>
          scnDays && scnDays.length === 0 ? <View style={{ height: 400 }}><Empty title={'当前暂无场次~'}/></View> : null
        }
      />
    </GenericTemplate>
  )
}

export default MovieAndCinemaScreen


