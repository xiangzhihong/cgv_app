import {useHeaderHeight} from '@react-navigation/stack'
import {
    Animated,
    Dimensions,
    Easing,
    Keyboard,
    Platform,
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Image,
    Text
} from 'react-native'
import React from 'react'
import {tools} from '../../utils'
import Avatar from '../../common/Avatar'
import {bizstream} from '../../bizstream'

const {width, height} = Dimensions.get('window')

const animate = new Animated.Value(0)
let keyboardWillShowListener = null
let keyboardWillHideListener = null
let keyboardDidShowListener = null
let keyboardDidHideListener = null

const ShareCustom = (
    {
        type, item, description = '',
        showEdit = true,
        value, onChangeText,
        footer = null, coverStyle = {},
        bottomContainerStyle,
        onCapture,
        assignRef,
        userInfo = {},
        images,
        ...props
    },
) => {

    const HeaderHeight = useHeaderHeight()
    const itemWidth = width - (type !== 'movie' ? 120 : 80)
    const imageHeight = (height - HeaderHeight) / 2
    const marginY = (height - HeaderHeight) / 4 * 3
    const lessHeight = height - HeaderHeight - marginY
    const [keyBoardHeight, setKeyBoardHeight] = React.useState(0)
    const {nickname = '', pic = ''} = userInfo
    React.useEffect(() => {
        Platform.OS === 'ios' && willShow()
        Platform.OS === 'ios' && willHide()
        Platform.OS === 'android' && didShow()
        Platform.OS === 'android' && didHide()
        return () => {
            Platform.OS === 'ios' && willRemove()
            Platform.OS === 'android' && didRemove()
        }
    }, [])


    const willShow = () => {
        keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (e) => {
            console.log(e)
            setKeyBoardHeight(e.endCoordinates.height)
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 1,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }

    const didShow = () => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyBoardHeight(e.endCoordinates.height)
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 1,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }

    const didHide = () => {
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 0,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }

    const willHide = () => {
        keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
            console.log(e)
            Animated.timing(animate, {
                duration: e.duration,
                toValue: 0,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.ease),
            }).start()
        })
    }


    const willRemove = () => {
        keyboardWillShowListener && keyboardWillShowListener.remove()
        keyboardWillHideListener && keyboardWillHideListener.remove()
    }


    const didRemove = () => {
        keyboardDidShowListener.remove()
        keyboardDidHideListener.remove()
    }


    return (
        <Animated.View style={[
            {borderRadius: 6, flex: 1, marginBottom: 8},
            {
                transform: [{
                    translateY: animate.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, lessHeight - keyBoardHeight - 20],
                    }),
                }],
            },
        ]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <View collapsable={false} ref={component => assignRef && assignRef(component)}
                      style={[tools.elevationShadowStyle(20),
                      ]}>
                    <Image onLoad={(e) => console.log(e)} source={{uri: `${bizstream.getMediaUrl()}${item}`}}
                           style={[styles.poster, styles.posterDefault, {width: itemWidth, height: imageHeight}]}
                           resizeMode="contain"/>
                    <View style={{flex: 1}}>
                        <View style={[{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderBottomRightRadius: 6,
                            borderBottomLeftRadius: 6
                        }, bottomContainerStyle]}>
                            <Avatar
                                source={typeof tools.getImage(pic) === 'number' ? tools.getImage(pic) : {uri: tools.getImage(pic)}}
                                style={[styles.avatar, {marginTop: -31}]}/>
                            <Text style={{marginTop: 5, textAlign: 'center'}} type="subheading">{nickname}</Text>
                            <View style={{marginHorizontal: 40, marginTop: 12, marginBottom: 20, flex: 1}}
                                  onLoad={(e) => console.log(e.nativeEvent)}>
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    textAlignVertical='top'
                                    style={{padding: 0, fontSize: 15, lineHeight: 24, color: '#777777'}}
                                    underlineColorAndroid="transparent"
                                    multiline
                                    maxLength={20}
                                    placeholder={description ? `${description} 精彩影片尽在CGV影城~` : '精彩影片尽在CGV影城~'}
                                    {...props}
                                />
                                {
                                    showEdit && <Image source={require('../../assets/images/share/edit.png')}
                                                       style={{
                                                           width: 14,
                                                           height: 14,
                                                           position: 'absolute',
                                                           right: 0,
                                                           bottom: 0
                                                       }}/>
                                }
                            </View>
                        </View>
                        {footer}
                    </View>
                </View>
            </ScrollView>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    posterDefault: {
        width: '100%',
    },
    posterComment: {
        width: '100%',
        height: '30%',
    },
    poster: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    commentContainer: {
        paddingVertical: 20,
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    commentAvatar: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    name: {
        textAlign: 'center',
        marginLeft: 6,
    },
    bottomInfo: {
        alignItems: 'flex-end',
    },
    bottomInfoTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: width / 3,
        borderRadius: 20,
        marginBottom: 10,
    },
    avatar: {
        width: 62,
        alignSelf: 'center',
        height: 62,
        borderRadius: 31,
        elevation: 30,
        shadowColor: 'rgba(0,0,0, 1)',
        shadowOffset: {width: 0, height: 600},
        shadowOpacity: 1,
    },
})

export default ShareCustom

