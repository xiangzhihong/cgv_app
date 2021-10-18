import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

const HomeBanner = ({list}) => {
  const Banner = ({item, height, style, onPress}) => {
    let baseUrl = 'https://prd-api.cgv.com.cn/api';
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: baseUrl + item?.advertImg}}
          resizeMode="cover"
          style={[{height}, style]}
        />
      </TouchableOpacity>
    );
  };

  const onPressBanner = (linkObjectInfo = '') => {
    // const info = linkObjectInfo.split('||');
    // console.log(info, 'onPressBanner111');
    // const first = info[0];
    // const second = info[1] || '';
  };

  return (
    <View style={{height: width * 0.35}}>
      <Swiper
        height={width * 0.35}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        paginationStyle={styles.paginationStyle}>
        {list.map((item, index) =>
          index > 2 ? null : (
            <Banner
              key={item.id}
              item={item}
              height={width * 0.35}
              style={styles.bannerStyle}
              onPress={() => onPressBanner(item.advertImgLinkurl)}
            />
          ),
        )}
      </Swiper>
    </View>
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
  bannerStyle: {
    marginHorizontal: 10,
    borderRadius: 6,
  },
  paginationStyle: {
    bottom: 5,
  },
});

export default HomeBanner;
