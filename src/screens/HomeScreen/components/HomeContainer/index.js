import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {tools} from '../../../../utils';

const {width} = Dimensions.get('window');
const HeaderPaddingTop =
  Platform.OS === 'ios' ? (width >= 375 ? 50 : tools.isIPhoneX() ? 40 : 10) : 0;
const initialLayout = {width: Dimensions.get('window').width};

function HomeContainer(props) {
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
        <View style={styles.nav}>
          <View style={styles.address}>
            {renderHeaderLeft ? renderHeaderLeft() : null}
          </View>
          <View style={styles.tabCon}>
            <View style={{flexDirection: 'row', width: NAVWIDTH}}>
              {props?.navigationState?.routes?.map((route, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.tabItem, {width: itemWidth}]}
                    onPress={() => setIndex(i)}>
                    <Text
                      style={[
                        styles.itemTxt,
                        {color: index === i ? '#FC5869' : '#777'},
                      ]}>
                      {route.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <Animated.View
                style={[styles.itemAnim, {left, width: itemWidth}]}>
                <View style={styles.itemInd} />
              </Animated.View>
            </View>
          </View>
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

export default HomeContainer;
