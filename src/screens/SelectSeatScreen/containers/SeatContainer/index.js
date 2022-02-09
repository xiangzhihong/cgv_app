import React from 'react'
import {Dimensions, ScrollView, StyleSheet, View, Text} from 'react-native'
import SeatItem from '../../components/SeatItem'
import ThumbnailSet from '../ThumbnailSet'

const {width: deviceWidth} = Dimensions.get('window')

const SeatContainer = ({
                           seatList,
                           screenName,
                           selected = [],
                           selectSeat,
                           seatThumbnailContainer,
                           setSeatThumbnailContainer,
                           animateLeft,
                           haveCheckImg
                       }) => {
    return (
        <View>
            <View style={styles.top}>
                <View style={styles.screen}>
                    <Text numberOfLines={1} style={styles.topTxt}>{screenName}</Text>
                </View>
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View collapsable={false} style={styles.seatContainer}>{
                            seatList && seatList.length && seatList.map((item, index) => (
                                <View style={{flexDirection: 'row'}} key={index}>{
                                        item.map((val, key) =>
                                            <SeatItem
                                                placeholder={index === 2 && key === 3}
                                                row={index}
                                                column={key}
                                                rowData={item}
                                                haveCheckImg={haveCheckImg}
                                                key={key}
                                                val={val}
                                                selected={selected.filter(pre => (pre.row === index) && (pre.column === key)).length > 0}
                                                isMax={selected.length === 6}
                                                onPress={selectSeat}
                                            />,
                                        )
                                    }
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
                <View style={styles.leftSort}>
                    {seatList.map((item, index) => {
                        return (
                            <View key={index} style={styles.row}><Text
                                style={{color: '#fff'}}>{item ? item[item.findIndex(it => it)]?.phyRowId : ''}</Text></View>
                        )
                    })}
                </View>
                <ThumbnailSet animateLeft={animateLeft} seatList={seatList} selected={selected}
                              seatThumbnailContainer={seatThumbnailContainer}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30
    },
    screen: {
        width: deviceWidth / 2,
        borderBottomLeftRadius: deviceWidth / 4,
        borderBottomRightRadius: deviceWidth / 4,
        backgroundColor: '#DCDCDC',
        overflow: 'hidden',
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    topTxt: {
        textAlign: 'center',
        color: '#777777'
    },
    leftSort: {
        position: 'absolute',
        top: 0,
        left: 5,
        backgroundColor: 'rgba(51,51,51,0.3)',
        paddingTop: 10,
        borderRadius: 10
    },
    row: {
        width: 20,
        height: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seatContainer: {
        paddingLeft: 22,
        marginTop: 10,
        paddingRight: 15
    },
    infoContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 2,
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        backgroundColor: '#ddd',
        marginBottom: 5,
    },
})

export default SeatContainer
