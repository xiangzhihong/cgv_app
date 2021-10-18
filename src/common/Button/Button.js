import React, {useContext} from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Spinner from '../Spinner/Spinner';
import {ThemeContext} from '../../theme';
import {DIMENS, SPACING, TYPOGRAPHY} from '../../constants';

const SOLID = 'solid';
const OUTLINE = 'outline';
const CLEAR = 'clear';

const defaultLoadingProps = (type, theme) => ({
  color: type === 'solid' ? theme.white : theme.primaryColor,
  size: 'small',
});

const TouchReceptor =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const propTypes = {
  title: PropTypes.string.isRequired,
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
  const {theme} = useContext(ThemeContext);

  const containerStyle = StyleSheet.flatten([
    styles.button(type, theme),
    style,
    disabled && styles.disabled(type, theme),
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.title(type, theme),
    textStyle,
    disabled && styles.disabledTitle(theme),
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
            {...defaultLoadingProps(type, theme)}
          />
        ) : (
          <Text style={titleStyle}>{title}</Text>
        )}
      </View>
    </TouchReceptor>
  );
};

const styles = StyleSheet.create({
  button: (type, theme) => ({
    flexDirection: 'row',
    padding: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: type === SOLID ? theme.primaryColor : theme.transparent,
    borderWidth: type === OUTLINE ? StyleSheet.hairlineWidth : 0,
    borderColor: theme.primaryColor,
    borderRadius: DIMENS.borderRadius,
  }),
  disabled: (type, theme) => ({
    backgroundColor: type === SOLID ? theme.disabledColor : theme.transparent,
    borderColor: theme.disabledDarkColor,
  }),
  title: (type, theme) => ({
    ...TYPOGRAPHY.buttonText,
    color: type === SOLID ? theme.white : theme.primaryColor,
  }),
  disabledTitle: theme => ({
    color: theme.disabledDarkColor,
  }),
  loading: {
    marginVertical: 2,
  },
});

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
