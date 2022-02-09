
const { NativeModules } = require('react-native')

const ShareUtile = NativeModules.UMShareModule
const AnalyticsUtile = NativeModules.UMAnalyticsModule

export {
  ShareUtile,
  AnalyticsUtile,
}
