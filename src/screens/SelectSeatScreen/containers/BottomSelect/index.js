import {ScrollView, View, TouchableOpacity, Image, Text} from 'react-native'
import React from 'react'


export default ({selected, selectSeat, seatList, currentTime}) => {

    const onPress = (row, column) => {
        const rowData = seatList[row]
        selectSeat(row, column, rowData)
    }

    return (
        <View>
            {
                selected.length > 0 &&
                <View style={{paddingVertical: 10, paddingLeft: 15, borderBottomWidth: 0.8, borderColor: '#EFEFEF'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            selected.map((item, index) => {
                                    const current = seatList[item.row][item.column]
                                    const {activity} = currentTime
                                    const {bktAmt, noCardDscAmt} = current
                                    let price = bktAmt
                                    if (activity === '1' && noCardDscAmt > 0 && noCardDscAmt < bktAmt) {
                                        price = noCardDscAmt;
                                    }
                                    return (
                                        <TouchableOpacity onPress={() => onPress(item.row, item.column)} activeOpacity={0.7}
                                                          key={index} style={{
                                            width: 80,
                                            height: 40,
                                            marginRight: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row'
                                        }}>
                                            <Image style={{width: 80, height: 36, position: 'absolute'}}
                                                   source={require('../../../../assets/images/seat/ticketbg.png')}/>
                                            <View style={{flex: 1}}>
                                                <Text style={{
                                                    color: '#222',
                                                    textAlign: 'center'
                                                }}>{`${item.phyRowId}???${item.phyColId}???`}</Text>
                                                <Text style={{color: '#E33322', textAlign: 'center'}}>???{price}</Text>
                                            </View>
                                            <Image source={require('../../../../assets/images/movie/close.png')}
                                                   style={{width: 10, height: 10, marginRight: 4}}/>
                                        </TouchableOpacity>
                                    )
                                }
                            )
                        }
                    </ScrollView>
                </View>
            }
        </View>
    )
}
