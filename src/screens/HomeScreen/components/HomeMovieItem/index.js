import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import {tools} from '../../../../utils';

const {width} = Dimensions.get('window');

const propTypes = {
  title: PropTypes.string,
  baseUrl: PropTypes.string,
  imgUrl: PropTypes.string,
  rating: PropTypes.number,
  favoriteFlag: PropTypes.bool,
  canBuy: PropTypes.bool,
  favoriteCnt: PropTypes.number,
  movieFormat: PropTypes.array,
  tag: PropTypes.string,
  note: PropTypes.string,
  actionType: PropTypes.string,
  onClickFavorite: PropTypes.func,
  onPress: PropTypes.func,
};

const defaultProps = {};

const HomeMovieItem = ({
  title,
  baseUrl,
  imgUrl,
  rating,
  favoriteFlag,
  favoriteCnt,
  movieFormat,
  tag,
  showTitleLabel,
  actionType,
  onClickFavorite,
  canBuy,
  note,
  onPress,
  onGotoBuy,
  score,
  likeCnt = 0,
  buttonText,
  showPraise = false,
  isPraise = false,
  cinemaLabel = [],
  movieId,
  ...props
}) => {
  const color =
    buttonText === '特惠'
      ? '#F1A23D'
      : buttonText === '预售'
      ? '#389AFC'
      : '#FC5869';
  const isAdvance = buttonText === '预售';

  return (
    <TouchableOpacity
      onPress={() => onPress({movieId, title, tag, isAdvance})}
      style={{width: 100, marginRight: 8}}>
      <ImageBackground
        source={
          imgUrl
            ? {uri: `${baseUrl}${imgUrl}`}
            : require('../../../../assets/images/common/image.jpg')
        }
        style={styles.topicImg}
        resizeMode="stretch">
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={{paddingBottom: 6, paddingTop: 12}}>
            {showPraise ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 6,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  {tools.getNum(likeCnt)} 人想看
                </Text>
                <TouchableOpacity>
                  <Icon name="heart" color={isPraise ? '#FC5869' : '#eee'} />
                </TouchableOpacity>
              </View>
            ) : (
              <Text
                style={{
                  color: isAdvance ? '#fff' : '#FEAE04',
                  textAlign: 'center',
                }}>
                {isAdvance
                  ? `${tools.getNum(likeCnt)} 人想看`
                  : `电影评分 ${score}`}
              </Text>
            )}
          </LinearGradient>
        </View>
      </ImageBackground>
      <View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
          <View style={{flex: 1}}>
            <Text style={{color: '#222'}} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>
        {note ? <Text style={{marginTop: 6}}>{note}</Text> : null}
        {buttonText ? (
          <TouchableOpacity onPress={onGotoBuy}>
            <View style={[styles.button, {backgroundColor: color}]}>
              <Text style={styles.stateTxt}>{buttonText}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topicImg: {
    width: 100,
    height: 142,
    borderRadius: 3,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F4F4F4',
  },
  input: {
    width: '67%',
    height: 46,
    backgroundColor: '#fff',
    padding: 0,
    paddingBottom: 0,
  },
  error: theme => ({
    margin: 4,
    fontSize: 12,
    color: theme.errorColor,
  }),
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginEnd: 12,
  },
  rightIconContainer: {
    marginStart: 8,
  },
  headerView: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftIcon: {
    width: 15,
    height: 13,
    marginLeft: 15,
    marginRight: 5,
  },
  button: {
    borderRadius: 25,
    width: 50,
    height: 25,
    marginTop: 6,
    justifyContent: 'center',
  },
  stateTxt: {
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
  },
});

HomeMovieItem.propTypes = propTypes;
HomeMovieItem.defaultProps = defaultProps;

export default HomeMovieItem;
