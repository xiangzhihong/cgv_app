import React, {useContext} from 'react';
import {ActivityIndicator, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  color: PropTypes.string,
  style: ViewPropTypes.style,
};

const defaultProps = {
  size: 'large',
  color: '',
  style: {},
};

const Spinner = ({size, color, style}) => {
  const primaryColor = '#222';
  return (
    <ActivityIndicator
      style={style}
      size={size}
      color={color || primaryColor}
    />
  );
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
