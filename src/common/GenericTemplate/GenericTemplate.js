import React, {useContext, Fragment} from 'react';
import {ScrollView, View, ViewPropTypes, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import MessageView from '../MessageView/MessageView';
import Status from '../../bizstream/Status';
import {ThemeContext} from '../../theme';
import {tools} from '../../utils';
import dimens from '../../constants/dimens';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  footer: PropTypes.element,
  scrollable: PropTypes.bool.isRequired,
  normal: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: ViewPropTypes.style,
};

const defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
  normal: true,
  footer: <></>,
};

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  /**
   * If set true, `ScrollView` would be root element
   * rather than normal `View`
   */
  scrollable = false,
  status,
  errorMessage,
  onRefresh,
  style,
  normal,
  showPadding = true,
  ...props
}) => {
  const {theme} = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;
  const Container = normal ? View : SafeAreaView;
  if (status === Status.ERROR) {
    return (
      <MessageView type="error" message={errorMessage} onRefresh={onRefresh} />
    );
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView backgroundColor="#fff" />;
  }

  return (
    <Fragment>
      <Container
        style={[
          styles.container(theme),
          {
            paddingBottom:
              showPadding && tools.isIPhoneX()
                ? dimens.IPhoneXBottomPadding
                : 0,
          },
        ]}
        {...props}>
        <ViewGroup style={[styles.content, style]}>{children}</ViewGroup>
        {footer}
      </Container>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingBottom: tools.isIPhoneX() ? dimens.IPhoneXBottomPadding : 0,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {},
});

GenericTemplate.propTypes = propTypes;

GenericTemplate.defaultProps = defaultProps;

export default GenericTemplate;
