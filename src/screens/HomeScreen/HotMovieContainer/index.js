import React, {useContext} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import HomeMovieItem from '../components/HomeMovieItem';
import baseConfig from '../../../api/httpConfig';

const HotMovieContainer = ({hotMovies, onViewAll, onItemPress, onGotoBuy}) => {
  const {datas = [], pages = 1, total = 0} = hotMovies;

  const renderHotMovieItem = ({item, index}) => {
    const text =
      item.activity == 1 ? '特惠' : item.tobeFlg == 1 ? '预售' : '购票';
    const {movieExts = []} = item;
    const cinemaLabel = movieExts
      .filter(val => val.movTypCd)
      .map(val => {
        const obj = {};
        obj.type = val.movTypCd;
        obj.title = val.movFmtCd;
        return obj;
      });

    return (
      <HomeMovieItem
        movieId={item.movId}
        score={item.productRating}
        likeCnt={item.likeCnt}
        cinemaLabel={cinemaLabel}
        showTitleLabel={item.dianyingYn}
        buttonText={text}
        title={item.productName}
        baseUrl={baseConfig.mediaUrl}
        imgUrl={item.imgUrl}
        rating={5}
        favoriteFlag
        favoriteCnt={3}
        movieFormat={null}
        tag="onSell"
        onPress={onItemPress}
        onGotoBuy={() => onGotoBuy(item.movCd, item.productName)}
        actionType="goupiao"
        onClickFavorite={null}
      />
    );
  };

  return datas.length > 0 ? (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleStyle}>在售影片</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.titleRight}
          onPress={() => onViewAll()}>
          <View>
            <Text type="label">全部影片</Text>
          </View>
          <Icon name="chevron-thin-right" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={datas}
        style={{paddingLeft: 12}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHotMovieItem}
        horizontal
        contentContainerStyle={{paddingRight: 15}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  title: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HotMovieContainer;
