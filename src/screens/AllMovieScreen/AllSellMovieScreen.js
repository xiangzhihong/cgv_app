import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Button,
} from 'react-native';
import ItemSeparator from '../../common/ItemSeparator';
import MovieCard from '../../common/MovieCard';
import {navigate, tools} from '../../utils';
import apiRequest from '../../api';
import httpConfig from '../../api/httpConfig';

const AllSellMovieScreen = ({navigation}) => {
  const hotMovies =
    '/product/plans?prMainPage=false&currentPage=0&prCity=31&chnlNo=05';

  const [dataList, setDataList] = React.useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const res = await apiRequest.get(hotMovies);
    console.log('getAllData, ', res);
    const list = res.datas;
    setDataList(list || []);
  };

  const gotoDetailPage = item => {
    navigation.navigate('MovieDetailScreen', {
      title: item.productName,
      movieId: item.movId,
    });
  };

  const loadMore = () => {
    if (dataList.length < 10) {
      return null;
    }
    getAllData(true);
  };

  const renderItem = ({item}) => {
    const text =
      item.activity == 1 ? '特惠' : item.tobeFlg == 1 ? '预售' : '购票';
    const color =
      text === '特惠' ? '#F1A23D' : text === '预售' ? '#389AFC' : '#FC5869';
    const isAdvance = text === '预售';
    const labels = item?.movieExts
      ?.filter(value => {
        return value.movFmtCd !== '普通' && value.movFmtCd;
      })
      .map(val => {
        const obj = {
          type: val.movTypCd,
          title: val.movFmtCd,
        };
        return obj;
      });
    return (
      <TouchableOpacity onPress={() => gotoDetailPage(item)}>
        <MovieCard
          baseUrl={httpConfig.mediaUrl}
          intro={item.description}
          movieName={item.productName}
          source={item.imgUrl}
          renderTitleRight={() => (
            <Text
              style={{
                color: isAdvance ? '#fff' : '#FEAE04',
                textAlign: 'center',
              }}>
              {isAdvance
                ? `${tools.getNum(item.likeCnt)} 人想看`
                : `电影评分 ${item.productRating}`}
            </Text>
          )}
          style={{padding: 15}}
          renderContentRight={() => (
            <Button
              onPress={() => {
                navigation.navigate('MovieAndCinemaScreen', {
                  prMovCd: item.movCd,
                  title: item.productName,
                });
              }}
              style={[styles.button, {backgroundColor: color}]}
              textStyle={{fontSize: 13}}
              title={text}
            />
          )}
          cast={item.starring}
          labels={labels}
          renderOtherInfo={() => (
            <Text style={{marginTop: 6}}>
              {/* <Text style={{ color: '#FEAE04' }}>{tools.getNum(item.buyCnt, true)}</Text>人购票 */}
            </Text>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={dataList}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <ItemSeparator />}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 0,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});

export default AllSellMovieScreen;
