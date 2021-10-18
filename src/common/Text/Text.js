import React, {useContext} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {TYPOGRAPHY} from '../../constants';
import {ThemeContext} from '../../theme';

const HEADING = 'heading';
const SUB_HEADING = 'subheading';
const BODY_HEADING = 'bodyheading';
const BODY = 'body';
const LABEL = 'label';
const NORMAL = 'normal';
const INTRO = 'intro';

const propTypes = {
  type: PropTypes.oneOf([
    HEADING,
    SUB_HEADING,
    BODY_HEADING,
    BODY,
    LABEL,
    NORMAL,
    INTRO,
  ]),
  bold: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

const defaultProps = {
  type: BODY,
  bold: false,
  style: {},
};

// NOTE: Improve comments quality
const Text = ({
  /**
   * @type prop helps style Text with pre default styling define in
   * typography.js. Possible value of type can be:
   * 1. 'heading'
   * 2. 'subheading'
   * 3. 'body'
   * 4. 'label'
   *
   * default value: 'body'
   */
  type,
  /**
   * @bold prop is a boolean, if enabled will use bold version of the
   * type mentioned.
   *
   * default value: false
   */
  bold,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   */
  style,
  ...props
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <RNText
      style={StyleSheet.flatten([getTextStyle(type, bold, theme), style])}
      {...props}
    />
  );
};

const getTextStyle = (type, bold, theme) => {
  let style = '';
  switch (type) {
    case HEADING:
      style = 'headingText';
      break;
    case SUB_HEADING:
      style = 'subheadingText';
      break;
    case BODY_HEADING:
      style = 'bodyheadingText';
      break;
    case LABEL:
      style = 'labelText';
      break;
    case NORMAL:
      style = 'normalText';
      break;
    case INTRO:
      style = 'introText';
      break;
    default:
      style = 'bodyText';
  }
  if (bold) {
    style += 'Bold';
  }
  return TYPOGRAPHY[style](theme);
};

Text.propTypes = propTypes;

Text.defaultProps = defaultProps;

export default Text;
