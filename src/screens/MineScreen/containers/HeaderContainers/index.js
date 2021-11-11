import React from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Text, ImageBackground} from 'react-native'
import ListItem from '../../../../common/ListItem'
import Avatar from '../../../../common/Avatar'
import {
    headerBgImage,
    edit,
    defaultAvatar,
    qrcode,
} from '../../../../assets/images/mine'
import Header from '../../components/Header'

export default () => {
    return (
        <ImageBackground source={headerBgImage}>
            <Header/>
            <ListItem
                text={'超越电影的感动'}
                titleContainerStyle={{marginLeft: 15}}
                style={{backgroundColor: 'transparent'}}
                textStyle={{color: 'transparent', marginTop: 4}}
                renderIcon={
                    () => (
                        <TouchableOpacity>
                            <Avatar source={defaultAvatar}
                                    style={{width: 75, height: 75, borderRadius: 40}}/>
                        </TouchableOpacity>
                    )
                }
                renderTitle={
                    () => (
                        <TouchableOpacity>
                            <Text style={{color: '#fff'}}>欢迎来到CGV影城</Text>
                        </TouchableOpacity>
                    )
                }
                renderRight={() => (
                    <TouchableOpacity>
                        <Image source={qrcode} style={{ width: 28, height: 28 }} />
                    </TouchableOpacity>
                )}
            />
            <View style={{marginBottom: 44, marginLeft: 15,marginTop:15, width: 75}}>
                <Text style={{color: '#fff', textAlign: 'center'}}>注册/登录</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    edit: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    level: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: '#F1A23D',
        borderRadius: 15,
    },

    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    bottom_item: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: '80%',
        width: 1,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    score: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
        marginRight: 2,
    },
})
