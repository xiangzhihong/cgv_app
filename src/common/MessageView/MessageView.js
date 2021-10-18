import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {ThemeContext} from '../../theme';
import {SPACING} from '../../constants';
import Image from '../Image/Image';
import Text from '../Text/Text';
import Button from '../Button/Button';

const INFO = 'info';
const SUCCESS = 'success';
const ERROR = 'error';

const propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([INFO, SUCCESS, ERROR]),
};

const defaultProps = {
  type: INFO,
};

const MessageView = React.memo(
  ({
    /**
     * @param {String} message text to be displayed
     */
    message,
    /**
     * @param {String} type determines styling of the text
     * type value can be
     * 1. 'info'
     * 2. 'success'
     * 3. 'error'
     */
    type,
    onRefresh,
  }) => {
    const {theme} = useContext(ThemeContext);
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/welcome/disconnect.png')}
          style={{width: 80, height: 180}}
        />
        <Text type="label" style={{color: '#999999', marginVertical: 4}}>
          网络连接失败~
        </Text>
        <Button
          onPress={onRefresh}
          style={styles.button}
          title="点击刷新"
          textStyle={{color: '#FC5869', fontSize: 13}}
        />
      </View>
    );
  },
);

const getTextColor = (type, theme) => {
  switch (type) {
    case SUCCESS:
      return theme.successColor;
    case ERROR:
      return theme.errorColor;
    default:
      return theme.bodyTextColor;
  }
};

// TODO: Is there any benefit of using StyleSheet when styles are function?
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: (type, theme) => ({
    textAlign: 'center',
    padding: SPACING.small,
    color: getTextColor(type, theme),
  }),
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderColor: '#FC5869',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

MessageView.propTypes = propTypes;

MessageView.defaultProps = defaultProps;

export default MessageView;
