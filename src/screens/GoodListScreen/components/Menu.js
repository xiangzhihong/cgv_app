import React from 'react'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import HotTitle from './HotTitle'
import httpConfig from "../../../api/httpConfig";

const Menu = ({item, isHot, isSelected, select}) => {
    return (
        <TouchableOpacity style={{backgroundColor: isSelected ? '#fff' : 'transparent'}} onPress={select}>
            <View style={styles.item}>
                <Image source={{uri: httpConfig.mediaUrl + item.categoryImageUrl}} style={styles.pic}/>
                <HotTitle title={item.categoryName} isHot={isHot}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pic: {
        height: 40,
        width: 40,
    },
})

export default Menu
