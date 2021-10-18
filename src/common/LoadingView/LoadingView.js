import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ThemeContext} from '../../theme';
import Image from '../Image/Image';
import Text from '../Text/Text';

const propTypes = {
  size: PropTypes.string,
  backgroundColor: PropTypes.string,
};

const defaultProps = {
  size: 'large',
  backgroundColor: null,
};

const LoadingView = ({
  /**
   * size of the spinner in LoadingView, can be
   * 1. 'large'
   * 2. 'small'
   */
  size,
  /**
   * background that will appear behind spinner,
   * by default: transparent
   */
  backgroundColor = '#fff',
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <>
      <View style={styles.container(backgroundColor, theme)}>
        <Image
          source={require('../../../assets/images/welcome/loading.gif')}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
        />
        <Text type={'label'}>页面加载中...</Text>
      </View>
    </>
  );
};

const styles = {
  container: (backgroundColor, theme) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: !backgroundColor ? theme.transparent : backgroundColor,
  }),
};

LoadingView.propTypes = propTypes;

LoadingView.defaultProps = defaultProps;

export default LoadingView;
