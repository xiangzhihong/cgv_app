import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MainPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size}) => {
            let sourceImg;
            if (route.name === 'Home') {
              sourceImg = focused
                ? require('./images/tab_home_p.png')
                : require('./images/tab_home_n.png');
            } else if (route.name === 'Me') {
              sourceImg = focused
                ? require('./images/tab_me_p.png')
                : require('./images/tab_me_n.png');
            }
            return <Image source={sourceImg} style={{width: 28, height: 28}} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Me" component={MeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  ct: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableStyle: {
    width: 300,
    height: 42,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06C1AE',
  },
  txtStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
  countText: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 24,
    color: '#06C1AE',
  },
});

export default MainPage;

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 28}}>Home Page</Text>
    </View>
  );
}

function MeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 28}}>Me Page</Text>
    </View>
  );
}
