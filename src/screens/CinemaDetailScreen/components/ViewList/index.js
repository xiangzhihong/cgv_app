import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {tools} from '../../../../utils'
import httpConfig from "../../../../api/httpConfig";

export default (
    {
        title = '影城图片',
        style,
        images,
        onImagePress,
    },
) => {

    return (
        <View style={[styles.container, style]}>
            <Text type="subheading">{title}</Text>
            <View style={{marginTop: 10}}>
                {onImagePress ? <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        images?.split(',').map((item, index) =>
                            <TouchableOpacity key={index.toString()} onPress={() => onImagePress(index)}>
                                <Image source={{uri: `${httpConfig.mediaUrl}${item}`}}
                                       style={{width: 165, height: 110, marginRight: 8}}/>
                            </TouchableOpacity>
                        )
                    }
                </ScrollView> : <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        images?.split(',').map((item, index) =>
                            <View key={index.toString()}>
                                <Image source={{uri: `${httpConfig.mediaUrl}${item}`}}
                                       style={{width: 165, height: 110, marginRight: 8}}/>
                            </View>
                        )
                    }
                </ScrollView>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingVertical: 12,
        marginTop: 10,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: tools.minLineHeight(),
    },
})
