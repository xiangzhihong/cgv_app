import {TouchableOpacity, View, StyleSheet, Animated, Easing, Text} from 'react-native';
import * as React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ShareBody = ({data}) => {
  return (
    <View style={styles.body}>
      <Text style={styles.title}>电影票</Text>
      <View style={styles.detail}>
        <Text style={styles.text}>票价</Text>
        <Text style={styles.text}>x1</Text>
        <Text style={styles.text}>¥{data}</Text>
      </View>
    </View>
  );
};

export default ({title = '结算明细', subtitle, list = [], data, children}) => {
  const top = new Animated.Value(0);

  const close = () => {
    Animated.timing(top, {
      duration: 120,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      global.siblingPanel && global.siblingPanel.destroy();
      global.siblingPanel = undefined;
    });
  };

  const show = () => {
    Animated.timing(top, {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    show();
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={close}
      style={styles.container}>
      <Animated.View
        style={[
          styles.content, {
            transform: [
              {
                translateY: top.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
          },
        ]}>
        <Header title={title} close={close} />
        <ShareBody list={list} subtitle={subtitle} data={data} />
        <TouchableOpacity
          onPress={close}
          style={{height: 50, borderTopColor: '#e5e5e5', borderTopWidth: 0.5}}>
          {children}
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Header = ({title, close}) => {
  return (
    <View style={styles.head}>
      <Text style={styles.subheading}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={close}>
        <AntDesign name="close" size={25} color="#181818" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  head: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  body: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingTop: 15
  },
  title: {
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
    color: '#181818',
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  subheading: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },

});
