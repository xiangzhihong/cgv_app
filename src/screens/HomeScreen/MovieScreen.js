import {
    StyleSheet,
    Text,
    ScrollView, RefreshControl, View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeBanner from './HomeBanner';
import HotMovieContainer from './HotMovieContainer';
import apiRequest from '../../api';
import SoonMovieContainer from './SoonMovieContainer';
import {navigate} from '../../utils';
import HomeRecommend from './HomeRecomend';

let scrollRef = null

const bannerUrl =
    '/content/api/advert/query?channel=APP&advertType=APP_SY_HEAD_AD&thatCd=';
const hotMovie =
    '/product/plans?prMainPage=true&currentPage=0&prCity=226&chnlNo=05';
const recommendUrl =
    '/content/api/advert/query?channel=APP&advertType=APP_SY_FOOT_AD&thatCd=';

function MovieScreen() {
    const [list, setList] = useState([]);
    const [hotData, setHotData] = useState([]);
    const [soonData, setSoonData] = useState([]);
    const [recommend, setRecommend] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false)

    useEffect(() => {
        getBannerList();
        getHotMovies();
        getSoonMovies();
        getRecommend();
    }, []);

    async function getHotMovies() {
        const data = await apiRequest.get(hotMovie);
        setHotData(data || []);
    }

    async function getBannerList() {
        const data = await apiRequest.get(bannerUrl);
        setList(data || []);
    }

    async function getSoonMovies() {
        let baseUrl = 'https://prd-api.cgv.com.cn/product/movie/list-soon';
        let param = {
            pageNumber: 0,
            cityCd: 226,
            chnlNo: '05',
            productTypeCd: '3',
        };
        const data = await apiRequest.post(baseUrl, param);
        setSoonData(data || []);
    }

    async function getRecommend() {
        const data = await apiRequest.get(recommendUrl);
        setRecommend(data || []);
    }

    function onRefresh() {
        try {
            setRefreshing(true)
            getBannerList();
            getHotMovies();
            getSoonMovies();
            getRecommend();
        } catch (e) {
            console.log(e)
        } finally {
            setRefreshing(false)
        }
    }

    const onViewAll = (params = {}) => {
        navigate('AllSellMovieScreen', params);
    };

    const onViewSoonAll = (params = {}) => {
        navigate('AllSoonMovieScreen', params);
    };

    const onItemPress = (params = {}) => {
        navigate('MovieDetailScreen', { ...params})
    }

    const onGotoBuy = (prMovCd, title) => {
        navigate('MovieAndCinemaScreen', {
            prMovCd,
            title,
        })
    }

    function renderBanner() {
        if(list.length>0){
            return (
                <HomeBanner list={list}/>
            )
        }
        return(<View/>);
    }

    return (
        <ScrollView style={styles.contain}
                    ref={e => scrollRef = e}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()}/>
                    }>
            {renderBanner()}
            <HotMovieContainer hotMovies={hotData} onViewAll={() => onViewAll()} onItemPress={onItemPress} onGoBuy={onGotoBuy}/>
            <SoonMovieContainer
                soonMovies={soonData}
                onViewAll={() => onViewSoonAll()}
                onItemPress={onItemPress}
            />
            <HomeRecommend list={recommend}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        paddingTop: 3,
        backgroundColor: '#fff',
    },
});

export default MovieScreen;
