import React, {useContext} from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ViewPropTypes,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import {DIMENS, SPACING, TYPOGRAPHY} from '../../constants';

const SOLID = 'solid';
const OUTLINE = 'outline';
const CLEAR = 'clear';

const defaultLoadingProps = (type) => ({
  color: type === 'solid' ? '#fff' : '#FC5869',
  size: 'small',
});

const TouchReceptor =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const propTypes = {
  title: PropTypes.string,
  type: PropTypes.oneOf([SOLID, OUTLINE, CLEAR]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
};

const defaultProps = {
  type: SOLID,
  onPress: () => {},
  disabled: false,
  style: {},
  loading: false,
};

const Button = ({
  type,
  title,
  onPress,
  disabled,
  loading,
  style,
  hasNotch = false,
  textStyle,
}) => {
  const containerStyle = StyleSheet.flatten([
    styles.button(type),
    style,
    disabled && styles.disabled(type),
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.title(type),
    textStyle,
    disabled && styles.disabledTitle,
  ]);

  return (
    <TouchReceptor
      onPress={!loading && onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      <View style={[containerStyle, hasNotch ? {paddingBottom: 24} : {}]}>
        {loading && !disabled ? (
          <Spinner
            style={styles.loading}
            {...defaultLoadingProps(type)}
          />
        ) : (
          <Text style={titleStyle}>{title}</Text>
        )}
      </View>
    </TouchReceptor>
  );
};

const styles = StyleSheet.create({
  button: (type) =>({
    flexDirection: 'row',
    padding: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: type === SOLID ? '#FC5869' : 'transparent',
    borderWidth: type === OUTLINE ? 1 : 0,
    borderColor: '#FC5869',
    borderRadius: DIMENS.borderRadius,
  }),
  disabled:(type) =>({
    backgroundColor: type === SOLID ? '#E3E6E8' : 'transparent',
    borderColor: '#99A1A8',
  }),
  title: (type) =>({
    ...TYPOGRAPHY.buttonText,
    color: type === SOLID ? '#fff' : '#FC5869',
  }),
  disabledTitle: {
    color: '#99A1A8',
  },
  loading: {
    marginVertical: 2,
  },
});

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
