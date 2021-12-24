import {useHeaderHeight} from '@react-navigation/stack'
import {Animated, Dimensions, Image, Text, StyleSheet, View, ScrollView} from 'react-native'
import React from 'react'
import {tools} from '../../utils'
import Avatar from '../../common/Avatar'
import moment from 'moment'
import StarRating from 'react-native-star-rating'

const {width, height} = Dimensions.get('window')


const ShareComment = (
    {
        type, item,
        value, onChangeText,
        footer = null, coverStyle = {},
        bottomContainerStyle,
        onCapture,
        assignRef,
        data,
        userInfo,
        images,
        ...props
    },
) => {

    const HeaderHeight = useHeaderHeight()
    const imageHeight = (height - HeaderHeight) / 2
    const date = moment(data.postedDateTime).format('YYYY-MM-DD')
    const pic = data.type === 'bbb' ? userInfo?.pic : data?.pic
    const nickname = data.type === 'bbb' ? userInfo?.nickname : data?.nickname

    return (
        <Animated.View style={[
            {borderRadius: 6, flex: 1, marginBottom: 8},
        ]}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                <View collapsable={false} ref={component => assignRef && assignRef(component)}
                      style={[tools.elevationShadowStyle(20),
                      ]}>
                    <Image onLoad={(e) => console.log(e)}
                           source={typeof tools.getImage(item) === 'string' ? {uri: tools.getImage(item)} : tools.getImage(item)}
                           style={[styles.poster, styles.posterDefault, {width: '100%', height: imageHeight}]}
                           resizeMode="contain"/>
                    <View style={{flex: 1}}>
                        <View style={[{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderBottomRightRadius: 6,
                            borderBottomLeftRadius: 6
                        }, bottomContainerStyle]}>
                            <View style={styles.commentContainer}>
                                <Text type="heading" bold
                                      style={{textAlign: 'center'}}>{data?.recommendProductMovieList?.length > 0 ? data?.recommendProductMovieList[0]?.productName : null}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginVertical: 8
                                }}>
                                    <Text type="subheading" bold style={{
                                        color: '#FEAE04',
                                        marginRight: 6
                                    }}>{data?.recommendProductMovieList?.length > 0 ? data?.recommendProductMovieList[0]?.productRating : null}</Text>
                                    {data.type === 'bbb' ? <Text type="normal" style={{
                                            lineHeight: 26,
                                            color: '#222'
                                        }}>{data.surveyName}</Text> :
                                        <View style={{width: 60}}>
                                            <StarRating
                                                halfStarEnabled
                                                disabled={false}
                                                starSize={12}
                                                maxStars={5}
                                                rating={(data.productRating * 1) / 2}
                                                fullStarColor="#FEAE04"
                                                activeOpacity={0.2}
                                            />
                                        </View>}
                                </View>
                                <View style={{}}>
                                    <Text type="normal"
                                          style={{lineHeight: 26, color: '#222'}}>{data.productReview}</Text>
                                </View>
                                <View style={styles.bottomInfo}>
                                    <View style={styles.bottomInfoTop}>
                                        <Avatar
                                            source={typeof tools.getImage(pic) === 'number' ? tools.getImage(pic) : {uri: tools.getImage(pic)}}
                                            style={[styles.commentAvatar, tools.elevationShadowStyle(30)]}/>
                                        <Text style={styles.name}>{nickname}</Text>
                                    </View>
                                    <Text>{date}</Text>
                                </View>
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

export default ShareComment

