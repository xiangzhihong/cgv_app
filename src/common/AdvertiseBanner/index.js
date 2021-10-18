import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {FlatList} from 'react-native-gesture-handler';
import {bizstream} from '../../bizstream';
import {AD_BANNER_TYPES} from '../../constants';
import {navigate} from '../../utils';

const {width} = Dimensions.get('window');

const TARGET_SCREEN_TYPE = {
  IntegralMall: 'IntegralMall',
  MovieDetail: 'DetailsMainPage',
  Topic: 'TopicPage',
  PromotionDetail: 'ActiveDetails',
  Game: 'YS',
  AboutCGV: 'AboutCGV',
  GoodsDetail: 'GoodsDetail',
};

const BANNER_CONFIG_MAP = {
  [AD_BANNER_TYPES.SHOP_TOP]: {
    height: 235,
    showsPagination: true,
  },
  [AD_BANNER_TYPES.MOVIE_BOTTOM]: {
    isFlatList: true,
  },
  [AD_BANNER_TYPES.MOVIE_TOP]: {
    height: width * 0.35,
    showsPagination: true,
    paginationStyle: {
      bottom: 5,
    },
    bannerStyle: {
      marginHorizontal: 10,
      borderRadius: 6,
    },
  },
  [AD_BANNER_TYPES.MOVIE_DETAIL]: {
    isInMovieDetail: true,
  },
};

const AdvertisingBanner = ({thatCd, len, isLoggedIn, type, navigation}) => {
  const option = {
    height: 90,
    showsPagination: false,
    ...(BANNER_CONFIG_MAP[type] || {}),
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    type && getBannerList();
  });

  const getBannerList = async () => {
    try {
      const data = await bizstream.admin.getBannerList(type, thatCd);
      setList(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const Banner = ({item, height, style, onPress}) => {
    const Continer = item?.advertImgLinkurl ? TouchableOpacity : View;
    return (
      <Continer onPress={onPress}>
        <Image
          source={{uri: bizstream.getMediaUrl() + item?.advertImg}}
          resizeMode="cover"
          style={[{height}, style]}
        />
        {type === 'APP_SY_FOOT_AD' ? (
          <Text style={{textAlign: 'center', paddingTop: 10, paddingBottom: 8}}>
            {item.advertTitle}
          </Text>
        ) : null}
      </Continer>
    );
  };

  const onPressBanner = (linkObjectInfo = '') => {
    const info = linkObjectInfo.split('||');
    console.log(info, '√√√infoinfoinfoinfoinfoinfoinfo');
    const first = info[0];
    const second = info[1] || '';
    const {
      IntegralMall,
      MovieDetail,
      Topic,
      PromotionDetail,
      Game,
      AboutCGV,
      GoodsDetail,
    } = TARGET_SCREEN_TYPE;
    if (first === IntegralMall) {
      if (isLoggedIn) {
        navigate('IntegralMallScreen');
      } else {
        navigate('MyModal', {screen: 'LoginScreen'});
      }
    } else if (first === AboutCGV) {
      navigate('AboutScreen');
    } else if (first === MovieDetail) {
      if (!option.isInMovieDetail) {
        navigate('MovieDetailScreen', {movieId: second});
      } else {
        navigation.push('MovieDetailScreen', {movieId: second});
      }
    } else if (first === Topic) {
      navigate('PersonalTopicScreen', {
        id: second,
        title: `${second} 话题讨论`,
      });
    } else if (first === PromotionDetail) {
      navigate('PromotionDetailScreen', {activeId: second});
    } else if (first === Game) {
      if (isLoggedIn) {
        navigate('IntegralMallScreen', {key: 'DUIBA_HD', title: '积分游戏'});
      } else {
        navigate('MyModal', {screen: 'LoginScreen'});
      }
    } else if (first === GoodsDetail) {
      navigate('GoodListScreen', {update: () => {}});
    } else {
      navigate('WebLinkScreen', {link: first});
    }
  };

  const renderItemSeparator = () => {
    return <View style={{height: 10}} />;
  };

  return !option.isFlatList ? (
    <View style={{height: option.height}}>
      <Swiper
        showsButtons={false}
        autoplay
        height={option.height}
        showsPagination={option.showsPagination}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        paginationStyle={option.paginationStyle}>
        {list.map((item, index) =>
          len && index > 1 ? null : (
            <Banner
              key={item.id}
              item={item}
              height={option.height}
              style={option.bannerStyle}
              onPress={() => onPressBanner(item.advertImgLinkurl)}
            />
          ),
        )}
      </Swiper>
    </View>
  ) : (
    <FlatList
      data={list}
      renderItem={({item}) => (
        <Banner
          key={item.id}
          item={item}
          height={option.height}
          style={option.bannerStyle}
          onPress={() => onPressBanner(item.advertImgLinkurl)}
        />
      )}
      ItemSeparatorComponent={() => renderItemSeparator}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default AdvertisingBanner;
