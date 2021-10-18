import React, {useEffect, useState} from 'react'
import {FlatList, View} from 'react-native'
import CinemaItem from '../../common/CinemaItem'
import ItemSeparatorComponent from '../../common/ItemSeparator'
import {navigate} from '../../utils'
import apiRequest from "../../api";

function CinemaScreen() {
    const [cityCinemas, setCityCinemas] = useState([]);

    useEffect(() => {
        getCinimaList();
    }, []);

    async function getCinimaList() {
        const url = 'https://prd-api.cgv.com.cn/product/thats?cityCd=226&pLati=0&pLnti=0';
        const data = await apiRequest.get(url);
        console.log('getCinimaList: ',data)
        setCityCinemas(data || []);
    }

    const onItemPress = (item) => {
        navigate('SelectSessionScreen', item)
    }

    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={cityCinemas}
                renderItem={({item, index}) => {
                    const distance = item.distance > 100 || !item?.distance ? '>100km' : `${item?.distance?.toFixed(1)}km`
                    const specScreens = item.specScreens.map(val => {
                        const obj = {}
                        obj.title = val.specScreenName
                        obj.type = 'movie'
                        return obj
                    })
                    return (
                        <CinemaItem
                            onItemPress={() => onItemPress(item)}
                            centerText={distance}
                            labels={specScreens}
                            addr={item.thatAddr}
                            name={item.thatNm}/>
                    )
                }
                }
                ItemSeparatorComponent={() => <ItemSeparatorComponent
                    containerStyle={{paddingLeft: 15}}
                />}
            />
        </View>
    )
}

export default CinemaScreen;
