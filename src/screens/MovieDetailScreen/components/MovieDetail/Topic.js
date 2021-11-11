import React, {useContext, useEffect} from 'react'
import {ScrollView, TouchableOpacity, StyleSheet, View, Text} from 'react-native'
// import {useTheme} from '@react-navigation/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Entypo'
import CommentItem from '../../../../common/CommentItem'
import SectionHeader from './SectionHeader'

const Comment = (
    {
        commentList = [1, 2, 3, 4],
        onItemPress,
        onPressBottom,
    }) => {
    const renderItem = (item, index) => {
        const isLast = commentList.length - 1 === index
        const {nickname = '', productReview = '', postedDateTime} = item
        const date = moment(postedDateTime).format('YYYY-MM-DD')
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => onItemPress(item)} key={index}>
                <CommentItem
                    isLast={isLast}
                    key={index.toString()}
                    date={date}
                    showComment
                    commentNumber={item.responseCnt}
                    title={item.surveyName}
                />
            </TouchableOpacity>
        )
    }
    return (
        <View style={{backgroundColor: '#fff', marginTop: 5, paddingTop: 30}}>
            <SectionHeader
                title="话题讨论"
            />
            <View style={{paddingLeft: 15}}>
                {
                    commentList.length === 0 ?
                        <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}><Text
                            type="label">暂无话题</Text></View> :
                        commentList.map((item, index) =>
                            renderItem(item, index),
                        )
                }
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.viewMore} onPress={onPressBottom}>
                <Text type="normal" style={{color: '#999'}}>查看全部话题讨论</Text>
                <Icon name="chevron-thin-right" size={14} color="#ccc"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingVertical: 2,
    },
    viewMore: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderColor: '#e5e5e5',
        borderTopWidth: 0.7,
    },
})

export default Comment
