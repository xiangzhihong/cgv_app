import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeBanner from './HomeBanner';
import HotMovieContainer from './HotMovieContainer';
import apiRequest from '../../api';
import SoonMovieContainer from './SoonMovieContainer';
import {navigate} from '../../utils';
import HomeRecommend from './HomeRecomend';

const bannerUrl =
  '/content/api/advert/query?channel=APP&advertType=APP_SY_HEAD_AD&thatCd=';
const hotMovie =
  '/product/plans?prMainPage=true&currentPage=0&prCity=31&chnlNo=05';
const recommendUrl =
  '/content/api/advert/query?channel=APP&advertType=APP_SY_FOOT_AD&thatCd=';

function MovieScreen() {
  const [list, setList] = useState([]);
  const [hotData, setHotData] = useState([]);
  const [soonData, setSoonData] = useState([]);
  const [recommend, setRecommend] = useState([]);

  const onViewAll = (params = {}) => {
    navigate('AllSellMovieScreen', params);
  };

  const onViewSoonAll = (params = {}) => {
    navigate('AllSoonMovieScreen', params);
  };

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
      cityCd: 31,
      chnlNo: '05',
      productTypeCd: '3',
    };
    const data = await apiRequest.post(baseUrl, param);
    setSoonData(data || []);
  }

  async function getRecommend() {
    const data = await apiRequest.get(recommendUrl);
    console.log('getRecommend', data);
    setRecommend(data || []);
  }

  useEffect(() => {
    getBannerList();
    getHotMovies();
    getSoonMovies();
    getRecommend();
  }, []);

  return (
    <ScrollView style={styles.contain}>
      <HomeBanner list={list} />
      <HotMovieContainer hotMovies={hotData} onViewAll={() => onViewAll()} />
      <SoonMovieContainer
        soonMovies={soonData}
        onViewAll={() => onViewSoonAll()}
      />
      <HomeRecommend list={recommend} />
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
