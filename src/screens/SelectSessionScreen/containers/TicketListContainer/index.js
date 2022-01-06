import React from 'react'
import {View} from 'react-native'
import TicketItem from '../../../../common/TicketItem'

export default (
    {
        data = [],
        onPressItemPress,
    },
) => {
    const targetData = data.length > 0 ? data[0] : {}
    const {movThats = []} = targetData
    const targetTimes = movThats.length > 0 ? movThats[0] : {}
    const {times = []} = targetTimes
    return (
        <View>
            {
                times.length === 0 ?
                    null : times.map((item, index) => {
                        const buttonText = item.activity === '1' ? '特惠' : '购票'
                        return (
                            <TicketItem
                                isDiscount={item.activity === '1'}
                                cardAmt={item.cardAmt}
                                data={item}
                                oldPrice={item.stdPrc}
                                index={index}
                                fromTime={item.scnFrTime}
                                endTime={item.scnToTime}
                                room={item.screenName}
                                newPrice={item.bktAmt}
                                desc={`${item.movLang}/${item.movType}`}
                                key={index.toString()}
                                buttonTitle={buttonText}
                                onPress={onPressItemPress}/>
                        )
                    }
                    )
            }
        </View>
    )
}
