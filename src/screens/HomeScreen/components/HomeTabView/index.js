import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {tools} from '../../../../utils';

const {width} = Dimensions.get('window');
const HeaderPaddingTop =
  Platform.OS === 'ios' ? (width >= 375 ? 50 : tools.isIPhoneX() ? 40 : 10) : 0;
const initialLayout = {width: Dimensions.get('window').width};

function HomeTabView(props) {
  const {FirstRoute, SecondRoute, renderHeaderLeft} = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'movie', title: '影片'},
    {key: 'cinema', title: '影院'},
  ]);
  const renderScene = SceneMap({
    movie: FirstRoute,
    cinema: SecondRoute,
  });

  const _renderTabBar = props => {
    const {position} = props;
    const len = props?.navigationState?.routes?.length;
    const NAVWIDTH = width / 3;
    const itemWidth = NAVWIDTH / len;
    const inputRange = props?.navigationState?.routes?.map((x, i) => i);
    const left = Animated.interpolate(position, {
      inputRange,
      outputRange: inputRange.map(inputIndex => inputIndex * itemWidth),
    });

    return (
      <View style={styles.container}>
        <View style={{width: NAVWIDTH, height: 44, alignSelf: 'center'}}>
          <TabBar
            {...props}
            style={{
              backgroundColor: '#ffffff',
              shadowColor: '#ffffff',
              height: 44,
            }}
            getLabelText={({route}) => route.title}
            labelStyle={{
              fontSize: 16,
            }}
            tabStyle={{
              height: 44,
              width: itemWidth,
            }}
            indicatorStyle={{backgroundColor: '#FC5869'}}
            activeColor={'#FC5869'}
            inactiveColor={'#777'}
          />
        </View>
      </View>
    );
  };

  return (
    <TabView
      renderTabBar={props => _renderTabBar(props)}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    paddingTop: HeaderPaddingTop,
    backgroundColor: '#fff',
  },
  nav: {
    width,
    height: 44,
    flexDirection: 'row',
  },
  address: {
    position: 'absolute',
    left: 5,
    alignSelf: 'center',
  },
  tabCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemAnim: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  itemInd: {
    width: 20,
    height: 2,
    backgroundColor: '#FC5869',
    borderRadius: 2,
  },
});

export default HomeTabView;
