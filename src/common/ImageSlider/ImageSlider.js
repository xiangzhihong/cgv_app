import React from 'react';
import {StyleSheet, ViewPropTypes, View} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Image from '../Image/Image';

class ImageSliderItem {
  constructor(title, image, onPressLink) {
    this.imageTitle = title;
    this.imageUrl = image;
    this.callToAction = onPressLink;
  }
}

const propTypes = {
  imageHeight: PropTypes.number.isRequired,
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      objectInfo: PropTypes.string,
    }),
  ).isRequired,
  baseUrl: PropTypes.string.isRequired,
  resizeMode: PropTypes.oneOf([
    'cover',
    'contain',
    'stretch',
    'repeat',
    'center',
  ]),
  autoplay: PropTypes.bool,
  style: ViewPropTypes.style,
};

const defaultProps = {
  resizeMode: 'cover',
  style: {},
  autoplay: true,
};

const ImageSlider = ({
  imageHeight, // Required prop
  slider, // Required prop
  baseUrl, // Required prop
  /**
   * Set it to true, for auto rotate of image,
   * default value is true
   */
  autoplay,
  resizeMode,
  style,
}) => {
  const renderImages = () =>
    slider.map((item, index) => (
      <Image
        key={String(index)}
        style={[styles.imageStyle, {height: imageHeight}]}
        resizeMode={resizeMode}
        source={{uri: `${baseUrl}${item.objectInfo}`}}
      />
    ));
  return (
    <View style={[{height: imageHeight}, style]}>
      {slider.length > 0 ? (
        <Swiper autoplay={autoplay}>{renderImages()}</Swiper>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    top: 0,
    marginHorizontal: 10,
    borderRadius: 6,
  },
});

ImageSlider.propTypes = propTypes;

ImageSlider.defaultProps = defaultProps;

export default ImageSlider;
export {ImageSliderItem};
