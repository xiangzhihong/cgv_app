import {Platform} from 'react-native';

const fontFamily = Platform.select({android: 'PingFang', ios: 'Helvetica'});
const fontWeightRegular = 'normal';
const fontWeightBold = 'bold';

export default {
  headingText: theme => ({
    fontFamily,
    color: theme.headingTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  headingTextBold: theme => ({
    fontFamily,
    color: theme.headingTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  subheadingText: theme => ({
    fontFamily,
    color: theme.subHeadingTextColor,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  subheadingTextBold: theme => ({
    fontFamily,
    color: theme.subHeadingTextColor,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  bodyheadingText: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  bodyheadingTextBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  bodyText: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  bodyTextBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 11,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  bodySmallText: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 9,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  bodySmallTextBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 9,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  labelText: theme => ({
    fontFamily,
    color: theme.labelTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  labelTextBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  introText: theme => ({
    fontFamily,
    color: theme.labelTextColor,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  introTexttBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  normalText: theme => ({
    fontFamily,
    color: theme.labelTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  }),
  normalTextBold: theme => ({
    fontFamily,
    color: theme.bodyTextColor,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontWeightBold,
  }),
  buttonText: {
    fontFamily,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
  },
  buttonTextSmall: {
    fontFamily,
    fontSize: 12,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 16,
  },
};
