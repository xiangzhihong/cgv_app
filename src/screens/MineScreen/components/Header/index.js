import React, {useContext, useEffect} from 'react'
import {View, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native'
import {tools, navigate} from '../../../../utils'
import {sign} from '../../../../assets/images/mine'

const {width} = Dimensions.get('window')

const Header = () => {
    return (
        <View style={[styles.container]}>
            <View style={styles.nav}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigate('IntegralMallScreen')}>
                    <Image source={sign} style={{width: 20, height: 20, marginRight: 20}}/>
                </TouchableOpacity>
            </View>
        </View>
    )

}

export default Header


const styles = StyleSheet.create({

    container: {
        paddingTop: tools.getHeaderTopPadding(),
    },
    nav: {
        width,
        height: 44,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tabItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
