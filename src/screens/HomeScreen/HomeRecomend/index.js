import React, {useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
const {width} = Dimensions.get('window');

const HomeRecommend = ({list}) => {
  const Banner = ({item, onPress}) => {
    let baseUrl = 'https://prd-api.cgv.com.cn/api';
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{uri: baseUrl + item?.advertImg}}
          resizeMode="cover"
          style={styles.itemImage}
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
    <View>
      <View style={styles.title}>
        <Text style={styles.titleStyle}>为你推荐</Text>
      </View>

      <FlatList
        data={list}
        renderItem={({item}) => (
          <Banner
            key={item.id}
            item={item}
            height={10}
            onPress={() => onPressBanner(item.advertImgLinkurl)}
          />
        )}
        ItemSeparatorComponent={() => <View height={10} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
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
  itemImage: {
    height: width * 0.35,
    marginHorizontal: 10,
    borderRadius: 6,
  },
});

export default HomeRecommend;
