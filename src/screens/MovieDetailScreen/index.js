import React, {useEffect, useState} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions,
    Easing,
    Platform,
    Button,
    Text,
    Image
} from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import HeaderImage from './components/MovieDetail/HeaderImage'
import Header from './components/MovieDetail/Header'
import Tab from './components/MovieDetail/Tab'
import Intro from './components/MovieDetail/Intro'
import StillPart from './components/MovieDetail/StillPart'
import CommentPart from './components/MovieDetail/Comment'
import Topic from './components/MovieDetail/Topic'
import MovieCard from '../../common/MovieCard'
import {tools} from '../../utils'
import Video from './components/video'
import httpConfig from "../../api/httpConfig";
import apiRequest from "../../api";

const {width, height} = Dimensions.get('window')
const HeaderHeight = 44
const HeaderPaddingTop = Platform.OS === 'ios' ? (width >= 390 ? 50 : tools.isIPhoneX() ? 40 : 10) : 0
const TotalHeaderHeight = HeaderHeight + HeaderPaddingTop
const ConstraintHeight = 0
const ImageHeight = 230
const scrollY = new Animated.Value(0)
const transY = new Animated.Value(0)
let introY = 0
let stillY = 0
let commentY = 0
let topicY = 0
const scrollRef = React.createRef()

const MovieDetail = (
    {
        route,
        navigation,
        thatCd,
        commentPage,
        isLogin,
    }) => {
    const {params = {}} = route
    const {movieId = {}, update, title} = params
    const [activeIndex, setActiveIndex] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const [detail, setDetail] = useState({})
    const [movieComments, setMovieComments] = useState([])
    const [movieTopics, setMovieTopics] = useState([])
    const [likeLoading, setLikeLoading] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        getDetail()
        getMovieStills()
        getMovieCommentList()
        getMovieTopicsList()
        return () => {
            scrollY.removeAllListeners()
        }
    }, [])

    // 获取详情
    async function getDetail() {
        let baseUrl = '/product/movie/' + movieId
        let param = {
            chnlNo: '05',
            cityCd: 226,
        };
        const res = await apiRequest.get(baseUrl, param)
        setDetail(res.product)
    }

    //获取剧照
    async function getMovieStills() {
        let baseUrl = '/product/movie-content/list'
        let param = {
            productId: movieId,
            pageSize: 50,
        };
        const res = await apiRequest.post(baseUrl, param)
    }

    //获取影评
    async function getMovieCommentList() {
        let baseUrl = '/product/product-reviews/ext/productReviewList'
        let param = {
            postedAnonymous: '1',
            productId: movieId,
            cityCd: 226,
            pageNumber: 0,
            pageSize: 10,
        };
        const res = await apiRequest.post(baseUrl, param)
        setMovieComments(res.content)
    }

    //获取话题
    async function getMovieTopicsList() {
        let baseUrl = '/product/surveys/ext/topiclist'
        let param = {
            productId: movieId,
            pageNumber: 0,
            pageSize: 10,
        };
        const res = await apiRequest.post(baseUrl, param)
        setMovieTopics(res.content)
    }

    const clickLike = async (data) => {

    }

    const onTabClick = (index) => {
        switch (index) {
            case 0:
                scrollTo(parseInt(introY))
                break
            case 1:
                scrollTo(parseInt(stillY))
                break
            case 2:
                scrollTo(parseInt(commentY))
                break
            case 3:
                scrollTo(parseInt(topicY))
                break
            default:
                scrollTo(parseInt(introY))
                break
        }
        setActiveIndex(index)
    }

    const scrollTo = (y) => {
        scrollRef?.current.scrollTo({x: 0, y, animated: true})
    }

    const getTargetPartY = (actualY) => {
        return actualY - TotalHeaderHeight - ConstraintHeight
    }

    const goPage = (name, params = {}) => {
        navigation.navigate(name, params)
    }

    const open = () => {
        setShowVideo(true)
        Animated.timing(transY, {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start()
    }

    const close = () => {
        Animated.timing(transY, {
            duration: 120,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => setShowVideo(false))
    }

    const onPraisePress = async (data) => {

    }


    function renderHeaderView() {
        return (<Header
            headerTitle={title}
            onLeftPress={() => navigation.goBack()}
            onRightPress={() => goPage('MovieShareScreen', {
                title,
                type: 'movie',
                images: detail?.stageImageUrl?.split(','),
                description: detail.description
            })}
            headerTitleStyle={{
                opacity: scrollY.interpolate({
                    inputRange: [-ImageHeight, 0, ImageHeight],
                    outputRange: [0, 0, 1],
                    extrapolate: 'clamp',
                }),
            }}/>);
    }

    const {productAttributes = [], productId, btnType, activity} = detail
    const Buttontext = activity === '1' ? '特惠购票' : btnType === '2' ? '预售' : btnType === '3' ? '立即购票' : '敬请期待'
    const color = activity === '1' ? '#F1A23D' : btnType === '2' ? '#389AFC' : '#FC5869'

    function renderIntroView() {
        return (
            <Intro desc={detail.longDescription} productAttributes={productAttributes} showMore={showMore}
                   onClickShow={() => setShowMore(!showMore)}/>
        );
    }

    function renderStillPartView() {
        return (
            <StillPart
                onItemPress={(index) => navigation.navigate('StillShareScreen', {
                    active: index,
                    images: detail?.stageImageUrl?.split(','),
                    title,
                    type: 'movie',
                    description: detail.description
                })}
                stills={detail?.stageImageUrl?.split(',')}
                onSectionHeaderPress={() => goPage('AllStillScreen', {
                    title,
                    images: detail?.stageImageUrl?.split(','),
                    type: 'movie',
                    description: detail.description
                })}/>
        );
    }

    function renderCommentView() {
        return (
            movieComments && <CommentPart
                onPraisePress={onPraisePress}
                commentList={movieComments.slice(0, 3)}
                onSectionHeaderPress={() => goPage('PublishCommentScreen', {type: '1', title: `${title}的评论`, movieId})}
                onItemPress={(item) => goPage('PersonalCommentScreen', {
                    movieId,
                    title: item.nickname, ...item,
                    images: detail?.stageImageUrl?.split(',')
                })}
                onPressBottom={() => goPage('AllCommentScreen', {
                    movieId,
                    title,
                    status: 1,
                    images: detail?.stageImageUrl?.split(',')
                })}
            />
        );
    }

    function renderTopicView() {
        return (
            movieTopics && <Topic
                commentList={movieTopics.slice(0, 3)}
                onItemPress={(item) => {
                    goPage('PersonalTopicScreen', {
                        movieId,
                        title: item.surveyName, ...item,
                        images: item?.shareImage?.split(',')
                    })
                }}
                onPressBottom={() => goPage('AllTopicScreen', {
                    movieId,
                    title,
                    images: detail?.stageImageUrl?.split(',')
                })}
            />
        );
    }

    return (
        <View style={{flex: 1, backgroundColor: '#efefef'}}>
            <HeaderImage source={{uri: httpConfig.mediaUrl + detail.smallImageUrl}}/>
            {renderHeaderView()}
            <View style={{flex: 1}}>
                <Animated.ScrollView
                    ref={scrollRef}
                    scrollEventThrottle={20}
                    stickyHeaderIndices={[1]}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false})}
                >
                    <View style={[styles.movieCard, {marginBottom: 16}]}>
                        <TouchableOpacity activeOpacity={1} onPress={open} style={{
                            backgroundColor: 'transparent',
                            height: ImageHeight - TotalHeaderHeight - 40
                        }}/>
                        {renderMovieCard(detail, clickLike)}
                    </View>
                    <Tab activeIndex={activeIndex} onTabClick={onTabClick}/>
                    <View onLayout={(e) => {
                        introY = getTargetPartY(e.nativeEvent.layout.y)
                    }}>
                        {renderIntroView()}
                    </View>
                    <View onLayout={(e) => {
                        stillY = getTargetPartY(e.nativeEvent.layout.y)
                    }}>
                        {renderStillPartView()}
                    </View>
                    <View onLayout={(e) => commentY = getTargetPartY(e.nativeEvent.layout.y)}>
                        {renderCommentView()}
                    </View>
                    <View onLayout={(e) => topicY = getTargetPartY(e.nativeEvent.layout.y)}>
                        {renderTopicView()}
                    </View>

                </Animated.ScrollView>
            </View>
            <Button title={Buttontext} onPress={() => {
                if (btnType > 1) {
                    goPage('MovieAndCinemaScreen', {
                        prMovCd: productId,
                        title,
                    })
                }
            }} hasNotch={tools.isIPhoneX()} style={{backgroundColor: color}}/>
            {
                showVideo ? <Animated.View style={{
                    width, height, backgroundColor: 'red', transform: [{
                        translateY: transY.interpolate({
                            inputRange: [0, 1],
                            outputRange: [height, 0],
                        }),
                    }], position:
                        'absolute',
                }}>
                    <Video close={close} originalImageUrl={detail.originalImageUrl}/>
                </Animated.View> : null
            }
        </View>
    )
}

const getAttr = (target = [], attr) => {
    const res = target.filter(item => item.attrName === attr)
    if (res && res.length > 0) {
        return res[0].attrValue
    }
    return ''
}

const renderMovieCard = (detail, clickLike) => {
    const {productAttributes = []} = detail
    const date = moment(detail.releaseDate).format('YYYY-MM-DD')
    const country = getAttr(productAttributes, 'ctry_fg_cd')
    const time = getAttr(productAttributes, 'scn_tm')
    const language = getAttr(productAttributes, 'mov_cpt_lag_cd')
    const labels = detail?.movTypFmt?.filter(item => item.indexOf('普通') < 0 && item).map(item => {
        const title = item.split('-')
        const obj = {
            title: title[1],
            type: title[0],
        }
        return obj
    })
    const infos = [
        {
            label: `${time}分钟`,
            icon: require('../../assets/images/movie/time.png'),
        },
        {
            label: language,
            icon: require('../../assets/images/movie/language.png'),
        },
        {
            label: date,
            icon: require('../../assets/images/movie/date.png'),
        },
        {
            label: country,
            icon: require('../../assets/images/movie/globe.png'),
        },
    ]
    return (
        <View>
            <View style={{
                elevation: 12,
                shadowColor: 'rgba(0,0,0,0.4)',
                shadowOffset: {width: 0, height: 0.2 * 12},
                shadowOpacity: 0.3, backgroundColor: '#fff', borderRadius: 5,
            }}>
                <MovieCard
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                    }}
                    titleStyle={{alignItems: 'flex-start', marginTop: 6}}
                    intro={detail.description}
                    movieName={detail.productName}
                    source={detail.smallImageUrl}
                    baseUrl={httpConfig.mediaUrl}
                    isDetail
                    labels={labels}
                    renderOtherInfo={() => (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text type="subheading" bold
                                  style={{color: '#FEAE04', marginRight: 6}}>{detail.productRating}</Text>
                            <View style={{width: 60}}>
                                <StarRating
                                    halfStarEnabled
                                    disabled={false}
                                    starSize={12}
                                    maxStars={5}
                                    rating={(detail.productRating * 1) / 2}
                                    fullStarColor="#FEAE04"
                                    activeOpacity={0.2}
                                />
                            </View>
                        </View>
                    )}
                    renderTitleRight={() => (
                        <TouchableOpacity activeOpacity={0.7} style={{alignItems: 'center'}}
                                          onPress={() => clickLike(detail)}>
                            <Icon name="heart" color={detail.productLike === '1' ? '#FC5869' : '#eee'} size={20}/>
                            <Text type="intro" style={{color: '#222', marginTop: 6}}><Text
                                style={{color: '#FEAE04'}}>{tools.getNum(detail.likeCnt)}</Text> 人想看</Text>
                        </TouchableOpacity>
                    )}
                />
                <MovieOtherInfo
                    infos={infos}
                />
            </View>
        </View>
    )
}

const MovieOtherInfo = (
    {
        infos = [],
    },
) => {
    return (
        <View style={styles.infoContainer}>
            {
                infos.map((item, index) =>
                    <View style={styles.movieInfo} key={index.toString()}>
                        <Image style={{marginRight: 6, width: 12, height: 12}} source={item.icon}/>
                        <Text type="label" style={{color: '#222'}}>{item.label}</Text>
                    </View>,
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    movieCard: {
        marginHorizontal: 15,
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    infoContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
    },
    movieInfo: {
        flexDirection: 'row',
        width: '50%',
        marginTop: 8,
        alignItems: 'center',
    },
})

export default MovieDetail;
