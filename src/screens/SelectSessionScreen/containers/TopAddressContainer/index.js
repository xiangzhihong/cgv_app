import React from 'react';
import {Text} from 'react-native';
import CinemaItem from '../../../../common/CinemaItem'

export default (
    {
        data,
        ...props
    }
) => {
    const {facilityGroup = '', specScreens} = data
    const targetData = facilityGroup ? facilityGroup.split(',').map(item => ({
        title: item,
        type: 'movie'
    })) : specScreens.map(item => ({
        title: item.specScreenName,
        type: 'movie'
    }))
    const distance = !data.distance ? '100km' : data.distance > 100 ? '>100km' : `${data.distance.toFixed(1)}km`
    return (
        <CinemaItem
            {...props}
            labels={targetData}
            name={data.thatNm}
            addr={data.thatAddr}
            rightStyle={{justifyContent: 'flex-start', alignItems: 'flex-end', paddingTop: 8}}
            centerTextStyle={{textAlign: 'right', marginTop: 10}}
            renderInfo={() => <Text>{distance}</Text>}/>
    )
}
