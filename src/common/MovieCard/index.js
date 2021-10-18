import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
const {width} = Dimensions.get('window');

const MovieCard = ({
  source = '',
  movieName = '',
  renderTitleRight,
  renderOtherInfo,
  renderContentRight,
  cast,
  intro = '',
  introStyle,
  labels = [],
  isDetail = false,
  style,
  rightLabelStyle,
  baseUrl,
  titleStyle,
}) => {
  return (
    <View style={[{flexDirection: 'row'}, style]}>
      <Image
        source={
          !source
            ? require('../../assets/images/common/image.jpg')
            : typeof source === 'number'
            ? source
            : {uri: baseUrl + source}
        }
        resizeMode="stretch"
        style={{
          width: width / 4,
          height: (110 / 77) * (width / 4),
          borderRadius: 3,
        }}
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            titleStyle,
          ]}>
          <View style={{flex: 1}}>
            <Text type="heading" bold numberOfLines={1}>
              {movieName}
            </Text>
          </View>
          {renderTitleRight ? renderTitleRight() : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1}}>
            {renderOtherInfo ? renderOtherInfo() : null}
            <View
              style={[{flexDirection: isDetail ? 'column-reverse' : 'column'}]}>
              <View style={{flexDirection: 'row'}}>
                {intro ? (
                  <View style={[styles.introContainer, introStyle]}>
                    <Text numberOfLines={1}>{intro}</Text>
                  </View>
                ) : null}
              </View>
              {cast ? (
                <Text numberOfLines={1} style={{marginTop: 5}}>
                  主演：{cast}
                </Text>
              ) : null}
              {labels.length > 0 ? (
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  {labels.map((item, index) => (
                    <CinemaLabel
                      data={item}
                      key={index.toString()}
                      rightLabelStyle={rightLabelStyle}
                    />
                  ))}
                </View>
              ) : null}
            </View>
          </View>
          {renderContentRight ? renderContentRight() : null}
        </View>
      </View>
    </View>
  );
};

const CinemaLabel = props => {
  const {data = {}, rightLabelStyle} = props;
  const {type = '2D', title = 'IMAX'} = data;
  return (
    <View style={styles.labelContainer}>
      <View style={styles.labelLeft}>
        <Text style={styles.labelLeftText}>{type}</Text>
      </View>
      <View style={[styles.labelRight, rightLabelStyle]}>
        <Text style={{fontSize: 7}}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    backgroundColor: '#F5F5F5',
    padding: 3,
    borderRadius: 3,
    marginTop: 4,
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9392A7',
    borderWidth: 0.7,
    borderRadius: 2,
    marginRight: 3,
    marginBottom: 3,
  },
  labelLeft: {
    backgroundColor: '#9392A7',
    height: '100%',
    paddingHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  labelLeftText: {
    fontSize: 7,
    color: '#fff',
  },
  labelRight: {
    padding: 2,
  },
});

export default MovieCard;

export {CinemaLabel};
