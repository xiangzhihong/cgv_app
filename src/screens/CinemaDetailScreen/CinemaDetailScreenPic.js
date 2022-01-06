import React, {useEffect, useState} from 'react'
import {View, Dimensions, Image, StyleSheet} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import {useHeaderHeight} from '@react-navigation/stack'
import httpConfig from "../../api/httpConfig";

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
const HeaderHeight = useHeaderHeight()

let carousel = null
const CinemaDetailScreenPic = (
    {
        route,
    },
) => {
    const {params = {}} = route
    const {active = 0, images} = params
    const [activeIndex, setActiveIndex] = useState(active)

    const renderItem = ({item, index}) => {
        return (
            <View style={{paddingTop: 60}}>
                <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={{uri: `${httpConfig.mediaUrl}${item}`}}
                />
            </View>
        )
    }

    return (
        <View
            style={styles.container}>
            <Carousel
                ref={e => carousel = e}
                removeClippedSubviews={false}
                onSnapToItem={index => {
                    setActiveIndex(index)
                }}
                firstItem={activeIndex}
                data={images}
                renderItem={renderItem}
                sliderWidth={deviceWidth}
                itemWidth={deviceWidth - 40}
                layout="tinder"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: (deviceHeight - HeaderHeight) / 4 * 3,
    },
    imageStyle: {
        width: deviceWidth - 40,
        height: deviceHeight * 0.8 - 100,
        backgroundColor: '#F5F5F5',
    },
})


export default CinemaDetailScreenPic;
