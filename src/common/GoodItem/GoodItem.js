import React from 'react'
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {navigate} from '../../utils'
import GoodInfo from '../GoodInfo/GoodInfo'
import httpConfig from "../../api/httpConfig";

const GoodItem = ({
                      item,
                      type,
                      where,
                      addOrder,
                      goBackRefresh,
                      showTag,
                      showPromotionText,
                      showCountBtnsForced,
                      canGoDetail = true
                  }) => {

    return (
        <TouchableOpacity onPress={() => navigate('GoodDetailScreen', {
            item, type, where, update: (i) => {
                addOrder(i)
                goBackRefresh()
            }
        })} disabled={!canGoDetail}>
            <View style={styles.item}>
                <Image style={styles.goodPic}  source={{uri: httpConfig.mediaUrl +item.smallImageUrl}}/>
                <GoodInfo item={item} addFun={addOrder} showTag={showTag} showPromotionText={showPromotionText}
                          showCountBtnsForced={showCountBtnsForced}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingTop: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row'
    },
    goodPic: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
})

export default GoodItem
