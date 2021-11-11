import React from 'react';
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {tools} from '../../../../utils'

const {width} = Dimensions.get('window')
const Tab = (
    {
        tabs = ['简介', '剧照', '评论', '话题'],
        activeTintColor = '#E33322',
        inactiveTintColor = '#777777',
        activeIndex = 0,
        onTabClick,
    }
) => {
    const getLeft = () => {
        let left = 0
        switch (activeIndex) {
            case 0 :
                left = 0
                break
            case 1 :
                left = width / 4
                break
            case 2:
                left = width / 2
                break
            case 3:
                left = width / 4 * 3
                break
            default:
                left = 0
                break
        }
        return left
    }
    return (
        <View style={styles.container}>
            {
                tabs.map((item, index) =>
                    (
                        <TouchableOpacity key={index.toString()} style={styles.tabItem}
                                          onPress={() => onTabClick(index)}>
                            <Text type="subheading"
                                  style={{color: (activeIndex === index ? activeTintColor : inactiveTintColor)}}>{item}</Text>
                        </TouchableOpacity>
                    )
                )
            }
            <Animated.View style={{
                position: 'absolute', bottom: 0, left: getLeft()
                , width: Dimensions.get('window').width / tabs.length, alignItems: 'center'
            }}>
                <View style={{width: 20, height: 2, backgroundColor: activeTintColor, borderRadius: 2}}/>
            </Animated.View>
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: tools.minLineHeight(),
        backgroundColor: '#fff',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden'
    },
    tabItem: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Tab
