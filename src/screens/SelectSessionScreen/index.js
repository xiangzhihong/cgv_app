import React, {useEffect} from 'react'
import {View, TouchableOpacity, Text, Image, Dimensions, StyleSheet, ScrollView} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import TipCard from '../../common/TipCard'
import TopAddress from './containers/TopAddressContainer'
import NoticeContainer from '../../common/NoticeContainer/NoticeContainer'
import TicketListContainer from './containers/TicketListContainer'
import DiscountItem from './components/DiscountItem'
import ListHeader from '../MovieAndCinemaScreen/components/ListHeader'
import apiRequest from "../../api";
import httpConfig from "../../api/httpConfig";
import moves from '../../mock/moveByCinema.json'
import scndysRes from '../../mock/moveScndys.json'
import schedule from '../../mock/movePrday.json'


let carousel = null
const SelectSessionScreen = (
    {
        navigation,
        route,
    },
) => {
    const {params = {}} = route
    const {productId = '', thatCd = '1011', thatId = '22', movieActiveIndex = 0} = params
    const [movies, setMovies] = React.useState([])
    const [selectedMovie, setSelectedMovie] = React.useState({})
    const [movTempThats, setMovTempThats] = React.useState({})
    const [scndys, setScndys] = React.useState([])
    const [schedul, setSchedul] = React.useState({})
    const [schedulDate, setSchedulDate] = React.useState({})
    const [firstItem, setFirstItem] = React.useState(0)
    const [seatNoCount, setSeatCount] = React.useState(0)
    const [activeIndex, setActiveIndex] = React.useState(movieActiveIndex)
    const [advertData, setAdvertData] = React.useState('LOADING')

    useEffect(() => {
        getMoviesByCinema()
        getAdvert()
        // seatCountPos()
    }, [])

    const getAdvert = async () => {
        const url = 'content/api/advert/query?channel=APP&advertType=APP_CCLB_AD&thatCd=' + thatCd;
        const res = await apiRequest.get(url);
        setAdvertData({title: res[0]?.adtype, desc: res[0]?.advertText})
    }

    const getMoviesByCinema = async () => {
        //https://prd-api.cgv.com.cn/product/plans/thats/movies?prThatCd=1166&chnlNo=05
        // let baseUrl = '/product/plans/thats/movies'
        // let param = {
        //     prThatCd: thatCd,
        //     chnlNo: '05',
        // };
        // const res = await apiRequest.get(baseUrl, param)
        const res = moves.data
        if (res.length > 0) {
            setMovies(res)
            let firstData
            if (productId) {
                firstData = res.filter(item => item.parentMovCd === productId)[0]
                const index = res.findIndex(item => item.parentMovCd === productId)
                setFirstItem(index)
            } else {
                firstData = res[0]
            }
            setSelectedMovie(firstData)
            const {parentMovCd} = firstData
            getSchedules(parentMovCd)
        }
    }

    const getSchedules = async (parentMovCd) => {
        // let baseUrl = '/product/plans/scndys'
        // let param = {
        //     prMovCd: parentMovCd,
        //     prThatCd: thatCd,
        //     chnlNo: '05',
        // };
        // const res = await apiRequest.get(baseUrl, param)
        const res = scndysRes.data
        setScndys(res || [])
        const obj = {}
        res?.map(item => obj[item.scnDy] = [])
        setSchedul(obj)
        const firstData = res[activeIndex]
        setSchedulDate(firstData)
        getScheduleDatesByCinemaAndMovie(thatCd, parentMovCd, firstData.scnDy)
    }

    const _onSwipe = (index) => {
        const selected = movies[index]
        setSelectedMovie(selected)
        setActiveIndex(0)
        const {parentMovCd} = selected
        getSchedules(parentMovCd)
    }

    const getScheduleDatesByCinemaAndMovie = async (thatCd, parentMovCd, pDate) => {
        const newSchedul = Object.assign({}, schedul)
        newSchedul[pDate] = []
        setSchedul(newSchedul)
        // let baseUrl = '/product/plans/thats/movies'
        // let param = {
        //     prDay: pDate,
        //     prMovCd: parentMovCd,
        //     prThatCd: thatCd,
        //     chnlNo: '05',
        // };
        // const res = await apiRequest.get(baseUrl, param)
        const res= schedule.data
        const newSchedulData = Object.assign({}, schedul)
        newSchedulData[pDate] = res
        setSchedul(newSchedulData)
        if (res != null && res[0]?.movThats != null && res[0]?.movThats.length > 0) {
            setMovTempThats(res[0].movThats[res[0].movThats.findIndex(ite => ite.thatCd === thatCd)])
        }
    }

    const getPrice = () => {
        const {bktAmt = '', cardAmt = '', minDscAmt = ''} = movTempThats || {}
        let minprice = null
        let tmparray = []
        if (bktAmt !== 0) {
            tmparray.push(bktAmt)
        }
        if (cardAmt !== 0) {
            tmparray.push(cardAmt)
        }
        if (minDscAmt !== 0) {
            tmparray.push(minDscAmt)
        }
        if (tmparray.length === 1) {
            minprice = tmparray[0];
        } else {
            const prices = tmparray.sort((a, b) => a - b)
            minprice = tmparray[0];
        }
        return {
            minprice,
        }
    }

    const onSelectScheduleDates = (index) => {
        const current = scndys[index]
        const {scnDy} = current
        setSchedulDate(current)
        const {parentMovCd} = selectedMovie
        setActiveIndex(index)
        getScheduleDatesByCinemaAndMovie(thatCd, parentMovCd, scnDy)
    }

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    carousel?.snapToItem(index, true)
                    _onSwipe(index)
                }}
                style={{borderRadius: 6, flex: 1}}>
                <Image style={{flex: 1, borderRadius: 6}} source={{uri: `${httpConfig.mediaUrl}${item.imgUrl}`}}/>
            </TouchableOpacity>
        )
    }

    const goSeat = (data, index) => {
        const currentSession = schedul[`${schedulDate.scnDy}`]
        const {movThats = [], movCd, movId, imgUrl, brandName} = currentSession[0]
        const {sarftThatCd, times = []} = movThats[0]
        const {screenCd, scnSchSeq, screenName, movLang, movType} = data
        navigation.navigate('SelectSeatScreen', {
            sarftThatCd,
            imgUrl,
            thatCd,
            times,
            selected: data,
            index,
            schedulDate,
            screenCd,
            scnSchSeq,
            screenName,
            movCd,
            movId,
            movName,
            movLang,
            movType,
            brandName,
            cinema: route.params,
            title: route.params.thatNm,
        })
    }

    const {movName = '', scnTm = '', movgnr = '', activity = '0'} = selectedMovie || {}

    function renderCarousel() {
        return (<View style={{height: 130, paddingHorizontal: 10, marginVertical: 10}}>
            {movies && movies?.length > 0 ?
                <Carousel
                    ref={(c) => {
                        carousel = c
                    }}
                    onSnapToItem={(index) => _onSwipe(index)}
                    data={movies}
                    firstItem={firstItem}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width - 20}
                    itemWidth={95}
                />
                : null}
        </View>);
    }

    function renderFilmDes() {
        return (<View style={styles.filmTxtStyle}>
            {
                activity === '1' && <TipCard/>
            }
            <Text style={{marginLeft: 6, marginRight: 10}} type="heading" bold>{movName}</Text>
            <Text style={{color: '#777'}} type="normal">{scnTm}?????? | {movgnr}</Text>
        </View>);
    }

    function renderDiscount() {
        return (
            <View style={{flexDirection: 'column'}}>
                {advertData && advertData.title ?
                    <DiscountItem title={advertData.desc} text={advertData.title === '1' ? '???' : '???'}
                                  isLast={false}
                                  style={{backgroundColor: '#F19E38'}} onPress={() => {
                        navigation.navigate('Home')
                    }}/> : null}
                {activity === '1' ? <DiscountItem title={`${movName || ''}????????????${getPrice().minprice || ''}??????`}
                /> : null}
            </View>
        );
    }

    function renderList() {
        return (
            <View>
                <ListHeader list={scndys} activeIndex={activeIndex}
                            onPress={index => onSelectScheduleDates(index)}/>
                <TicketListContainer onPressItemPress={goSeat}
                                     data={schedul[`${schedulDate?.scnDy}`]}/>
            </View>
        );
    }

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            {movies &&
                <View>
                    <TopAddress data={route.params} addrTextType="body"
                                onItemPress={() => navigation.navigate('CinemaDetailScreen', params)}/>
                    <NoticeContainer style={{backgroundColor: '#F5F5F5', borderBottomWidth: 0, marginHorizontal: 0}}
                                     bgContainerStyle={{backgroundColor: '#F5F5F5'}}/>
                    {renderCarousel()}
                    {renderFilmDes()}
                    {renderDiscount()}
                    {renderList()}
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    filmTxtStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12
    },
});


export default SelectSessionScreen;
