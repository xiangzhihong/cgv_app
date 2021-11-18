import React from 'react'
import {StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native'
import httpConfig from "../../api/httpConfig";

const {width, height} = Dimensions.get('window')

const AllStillScreen = (
    {
        navigation,
        route,
    },
) => {
    const {params} = route
    const {title, description, images} = params

    React.useEffect(() => {
    })

    return (
        <View style={{backgroundColor: '#fff'}}>
            <ScrollView>
                {
                    images.map((item, index) =>
                        <TouchableOpacity style={styles.cover} key={index.toString()} activeOpacity={0.7}
                                          onPress={() => navigation.navigate('StillShareScreen', {
                                              active: index,
                                              images,
                                              title,
                                              type: 'movie',
                                              description
                                          })}>
                            <Image resizeMode={'cover'} style={styles.cover}
                                   source={{uri: `${httpConfig.mediaUrl}${item}`}}/>
                        </TouchableOpacity>,
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    cover: {
        width,
        minHeight: 250,
    },
})

export default AllStillScreen;

