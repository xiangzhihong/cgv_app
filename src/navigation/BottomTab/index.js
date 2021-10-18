import * as React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Entypo';
import HomeScreen from '../../screens/HomeScreen';
import PromotionScreen from '../../screens/PromotionScreen';
import ShopScreen from '../../screens/ShopScreen';
import MineScreen from '../../screens/MineScreen';
import tabImage from '../../assets/images/tabs';
import AllSellMovieScreen from '../../screens/AllMovieScreen/AllSellMovieScreen';
import AllSoonMovieScreen from '../../screens/AllSoonMovieScreen/AllSoonSellMovieScreen';

const BottomTabs = createBottomTabNavigator();
const RootStack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <RootStack.Navigator
      initialRouteName="MovieScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          shadowOffset: {width: 0, height: 0},
          shadowColor: '#E5E5E5',
          shadowOpacity: 0,
          borderBottomWidth: 0.7,
          borderBottomColor: '#E5E5E5',
          elevation: 0,
          backgroundColor: '#fff',
        },
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MovieScreen')}
            hitSlop={{left: 10, right: 40, top: 15, bottom: 15}}
            style={{marginLeft: 12}}>
            <Icon name="chevron-thin-left" size={18} color="#222222" />
          </TouchableOpacity>
        ),
      }}>
      <RootStack.Screen
        name="MovieScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="AllSellMovieScreen"
        component={AllSellMovieScreen}
        options={{title: '全部在售影片'}}
      />
      <RootStack.Screen
        name="AllSoonMovieScreen"
        component={AllSoonMovieScreen}
        options={{title: '全部即映影片'}}
      />
    </RootStack.Navigator>
  );
};

const BottomTabScreen = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return (
            <Image
              source={
                focused
                  ? tabImage[`${route.name}_active`]
                  : tabImage[route.name]
              }
              style={{width: 26, height: 26}}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          borderTopColor: '#E8E8E8',
          elevation: 0,
          backgroundColor: '#fff',
        },
      }}>
      <BottomTabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: '电影',
        }}
      />
      <BottomTabs.Screen
        name="Promotion"
        component={PromotionScreen}
        options={{
          tabBarLabel: '活动',
        }}
      />
      <BottomTabs.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: '商店',
        }}
      />
      <BottomTabs.Screen
        name="Mine"
        component={MineScreen}
        options={{
          tabBarLabel: '我的',
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabScreen;
