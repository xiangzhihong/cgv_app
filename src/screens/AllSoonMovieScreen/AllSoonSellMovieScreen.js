import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Text,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import ItemSeparator from '../../common/ItemSeparator';
import MovieCard from '../../common/MovieCard';
import {navigate, tools} from '../../utils';
import apiRequest from '../../api';
import httpConfig from '../../api/httpConfig';
import moment from 'moment';

const AllSoonMovieScreen = ({navigation}) => {
  const [dataList, setDataList] = React.useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const movieUrl = '/product/movie/list-soon-group-new';
    const param = {
      currentPage: 0,
      pageNumber: 0,
      prMainPage: false,
      cityCd: 31,
      chnlNo: '05',
      productTypeCd: '3',
    };
    const res = await apiRequest.post(movieUrl, param);
    console.log('getAllData====> ', res);
    const list = res.content;
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
    getAllData();
  };

  const getAttr = (target = [], attr) => {
    const res = target.filter(item => item.attrName === attr);
    if (res.length > 0) {
      return res[0].attrValue;
    }
    return '';
  };

  const renderItem = ({item}) => {
    const text =
      item.activity === '1' ? '特惠' : item.btnType === '2' ? '预售' : '';
    const color = '#389AFC';
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
      <TouchableOpacity
        onPress={() => gotoDetailPage(item)}
        activeOpacity={0.7}>
        <MovieCard
          introStyle={{maxWidth: 200}}
          baseUrl={httpConfig.mediaUrl}
          source={item.smallImageUrl}
          intro={item.description || item.longDescription}
          movieName={item.productName}
          renderTitleRight={() => (
            <Text
              style={{color: '#FEAE04', textAlign: 'center'}}>{`${tools.getNum(
              item.likeCnt,
            )} 人想看`}</Text>
          )}
          style={{padding: 15}}
          renderContentRight={() =>
            item.btnType === '2' ? (
              <Button
                style={[styles.button, {backgroundColor: color}]}
                textStyle={{fontSize: 13}}
                title={text}
              />
            ) : (
              <Icon
                name="heart"
                color={item.productLike === '0' ? '#eee' : '#FC5869'}
                size={16}
              />
            )
          }
          cast={getAttr(item.productAttributes, 'actor')}
          labels={labels}
          renderOtherInfo={() => (
            <Text>
              {/* <Text style={{ color: '#FEAE04' }}>{tools.getNum(item.buyCnt, true)}</Text>人购票 */}
            </Text>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <SectionList
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => index.toString()}
        sections={dataList}
        renderSectionHeader={({section: {date, week}}) => (
          <View style={styles.sectionTitle}>
            <Text type="subheading" bold>{`${moment(date).format(
              'M月D日',
            )} ${week}`}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        stickySectionHeadersEnabled={false}
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
  sectionTitle: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

export default AllSoonMovieScreen;
