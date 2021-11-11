import React, {useContext, useEffect} from 'react'
import {ScrollView, TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import SectionHeader from './SectionHeader'
import httpConfig from "../../../../api/httpConfig";

const StillPart = (
    {
        stills = [],
        onSectionHeaderPress,
        onItemPress,
    },
) => {
    return (
        <View style={{backgroundColor: '#fff'}}>
            <SectionHeader
                renderRight={() =>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                      onPress={onSectionHeaderPress}>
                        <Text type="normal">查看全部</Text>
                        <Icon name="chevron-thin-right" size={16} color="#ccc"/>
                    </TouchableOpacity>
                }
            />
            <View style={{paddingLeft: 15, marginVertical: 12}}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        stills.map((item, index) =>
                            <TouchableOpacity style={styles.cover} key={index.toString()} activeOpacity={0.7}
                                              onPress={() => onItemPress(index)}>
                                <Image style={styles.cover} source={{uri: httpConfig.mediaUrl+`${item}`}}/>
                            </TouchableOpacity>,
                        )
                    }
                </ScrollView>
            </View>
        </View>

    )
}

export default StillPart


const styles = StyleSheet.create({
    cover: {
        width: 190,
        height: 100,
        marginRight: 10,
    },
})
