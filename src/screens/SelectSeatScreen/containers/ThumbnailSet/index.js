import React from 'react'
import {Animated, Dimensions, StyleSheet, View} from 'react-native'
import SeatItem from '../../components/SeatItem'

const {width: deviceWidth} = Dimensions.get('window')

const ThumbnailSet = ({selected, seatList, seatThumbnailContainer, animateLeft}) => {
    const {width = deviceWidth} = seatThumbnailContainer
    return (
        <Animated.View style={[
            {backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', left: 0, top: 0},
            {
                transform: [{
                    translateX: animateLeft.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-width, 0],
                    }),
                }],
            },
            {
                opacity: animateLeft.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        ]} >
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={styles.contain}/>
                </View>
                <View>
                    <View>
                        <View style={{paddingLeft: 10, paddingRight: 6, marginTop: 2}}>
                            {
                                seatList.map((item, index) => (
                                    <View style={{flexDirection: 'row'}} key={index}>
                                        {
                                            item.map((val, key) =>
                                                <SeatItem
                                                    disabled
                                                    style={{marginBottom: 2}}
                                                    iconStyle={{width: 8, height: 8}}
                                                    placeholder={index === 2 && key === 3}
                                                    row={index}
                                                    column={key}
                                                    key={key}
                                                    val={val}
                                                    selected={selected.filter(pre => (pre.row === index) && (pre.column === key)).length > 0}
                                                    isMax={selected.length === 6}
                                                />,
                                            )
                                        }
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#999999',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        height: 8,
        flex: 1,
        marginHorizontal: 50,
        marginTop: 2
    },
})

export default ThumbnailSet
