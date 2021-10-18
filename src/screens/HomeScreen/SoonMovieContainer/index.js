import React, {useContext} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import HomeMovieItem from '../components/HomeMovieItem';

const SoonMovieContainer = ({soonMovies, onViewAll, onItemPress}) => {
  const {content = []} = soonMovies;
  console.log(soonMovies, 'comingSoonMovies111');
  const renderSoonMovieItem = ({item}) => {
    const labels = item?.movTypFmt
      ?.filter(value => {
        return value.indexOf('普通') < 0 && value;
      })
      .map(val => {
        const title = val.split('-');
        const obj = {
          title: title[1],
          type: title[0],
        };
        return obj;
      });
    return (
      <HomeMovieItem
        movieId={item.id}
        onPress={onItemPress}
        showPraise
        score={item.productRating}
        likeCnt={item.likeCnt}
        isPraise={item.productLike === '1'}
        showTitleLabel={item.dianyingYn}
        note={`${moment(item.releaseDate).format('MM月DD日')}上映`}
        title={item.productName}
        baseUrl="http://prd-api.cgv.com.cn/api"
        imgUrl={item.smallImageUrl}
        rating={5}
        favoriteFlag
        favoriteCnt={3}
        movieFormat={null}
        tag="upcoming"
        cinemaLabel={labels}
        actionType="goupiao"
        onClickFavorite={null}
      />
    );
  };
  return content.length > 0 ? (
    <View>
      <View style={styles.title}>
        <Text style={styles.titleStyle}>即映影片</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.titleRight}
          onPress={onViewAll}>
          <Text type="label">全部影片</Text>
          <Icon name="chevron-thin-right" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={content.slice(0, 10)}
        contentContainerStyle={{paddingRight: 20}}
        style={{paddingLeft: 12}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSoonMovieItem}
        horizontal
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

SoonMovieContainer.propTypes = {
  // slider: PropTypes.arrayOf(PropTypes.instanceOf(ImageSliderItem)).isRequired,
};

export default SoonMovieContainer;
