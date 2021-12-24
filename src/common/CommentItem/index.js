import React, {useContext, useEffect} from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import Avatar from '../Avatar'
import {del} from '../../assets/images/movie/del.png'
import comment from '../../assets/images/movie/comment.png'
import praise from '../../assets/images/movie/praise.png'
import praiseActive from '../../assets/images/movie/praiseActive.png'
import {tools} from '../../utils'
import {goBack} from '../../utils/rootNavigation';
import StarRating from 'react-native-star-rating'

const CommentItem = (
    {
        contentStyle,
        style,
        avatar,
        avatarStyle = {},
        onAvatarPress,
        name,
        renderRate,
        title,
        content,
        date,
        showPraise,
        showShare,
        onSharePress,
        onPraisePress,
        praiseNumber,
        showComment = true,
        commentNumber,
        showReport,
        isPraised,
        onReportPress = () => {
        },
        isLast = false,
        renderOther,
        isReverse = false,
        showTriangle = false,
        titleBold = false,
        showDel = false,
        onDelPress,
        praising = false,
        data,
        productRating,
        isShowProductRating = false
    },
) => {

    const PraiseView = onPraisePress ? TouchableOpacity : View

    const report = (preData) => {

        tools.confirm('是否举报？', undefined, () => {
            onReportPress(preData)
            goBack();
        }, '举报')
    }

    return (
        <View style={[styles.container, style]}>
            {
                avatar ? <Avatar style={avatarStyle} source={typeof avatar === 'number' ? avatar : {uri: avatar}}
                                 onPress={onAvatarPress}/> : null
            }
            <View style={[styles.content, {borderBottomWidth: isLast ? 0 : 0.7}]}>
                <View>
                    {name ? <Text type="label">{name}</Text> : null}
                    {
                        renderRate ? renderRate() : null
                    }
                    {
                        title ? <Text type="subheading" bold={titleBold}>{title}</Text> : null
                    }
                    <View style={{flexDirection: isReverse ? 'column-reverse' : 'column'}}>
                        <View>
                            {
                                content ? <Text type="label" numberOfLines={3} ellipsizeMode={'tail'}
                                                style={[styles.contentText, contentStyle]}>{content}</Text> : null
                            }
                            {
                                renderOther ? renderOther() : null
                            }
                        </View>
                        <View style={styles.contentBottom}>
                            <View style={styles.contentBottomDate}>
                                <Text type="label" style={styles.labelText}>{date} </Text>
                                {isShowProductRating && <StarRating
                                    halfStarEnabled
                                    disabled={false}
                                    starSize={12}
                                    maxStars={5}
                                    rating={(productRating * 1) / 2}
                                    fullStarColor="#FEAE04"
                                    activeOpacity={0.2}
                                />}
                            </View>
                            <View style={styles.labelContainer}>
                                {
                                    showPraise
                                        ? <PraiseView hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
                                                      style={styles.label} disabled={praising}
                                                      onPress={() => onPraisePress(data)} activeOpacity={0.7}>
                                            <Image source={isPraised ? praiseActive : praise}
                                                   style={{width: 10, height: 10, marginRight: 3}}/>
                                            <Text type="label" style={styles.labelText}>{praiseNumber}</Text>
                                        </PraiseView>
                                        : null
                                }
                                {
                                    showComment
                                        ? <View style={styles.label}>
                                            <Image source={comment} style={{width: 10, height: 9, marginRight: 3}}/>
                                            <Text type="label" style={styles.labelText}>{commentNumber}</Text>
                                        </View>
                                        : null
                                }
                                {
                                    showReport
                                        ? <TouchableOpacity activeOpacity={0.7} onPress={() => report(data)}
                                                            style={styles.label}>
                                            <Image source={require('../../assets/images/movie/Reporting.png')}
                                                   style={{width: 16, height: 16, marginRight: 3}}/>
                                        </TouchableOpacity>
                                        : null
                                }
                                {
                                    showShare
                                        ? <TouchableOpacity activeOpacity={0.7} onPress={onSharePress}
                                                            style={styles.label}>
                                            <Text type="label">icon</Text>
                                        </TouchableOpacity>
                                        : null
                                }
                                {
                                    showDel
                                        ?
                                        <TouchableOpacity activeOpacity={0.7} onPress={onDelPress} style={styles.label}>
                                            <Image source={del} style={{width: 9, height: 11, marginRight: 4}}/>
                                            <Text style={{color: '#999999'}}>删除</Text>
                                        </TouchableOpacity>
                                        : null
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {
                showTriangle ? <View style={styles.triangle}/> : null
            }
        </View>
    )

}


export default CommentItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 18,
    },
    content: {
        flex: 1,
        paddingRight: 15,
        borderColor: '#e5e5e5',
        paddingBottom: 18,
        borderBottomWidth: 0.7,
    },
    contentBottomDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        color: '#999',
    },
    contentText: {
        color: '#222',
    },
    nameText: {
        color: '#777',
    },
    triangle: {
        width: 0,
        height: 0,
        borderBottomWidth: 5,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomColor: '#f5f5f5',
        position: 'absolute',
        bottom: 0,
        left: 22,
    },
})
