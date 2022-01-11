import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import CommentItem from '../../../common/CommentItem'
import ButtonListFooter from '../../../common/ButtonListFooter/ButtonListFooter'
import {navigate} from '../../../utils'
import httpConfig from "../../../api/httpConfig";

const Comments = ({ canPublish, data, list = [], publishComment, gotoAllComments }) => (
  <View style={styles.comments}>
    <View style={styles.titleLayer}>
      <Text style={styles.title}>用户评价</Text>
      {canPublish && <Button onPress={publishComment} textStyle={{ fontSize: 13 }} style={styles.btn} title="发表评论"/>}
    </View>
    {list.map((item, index) => (
      <TouchableOpacity key={index.toString()} onPress={() => navigate('PersonalCommentScreen', {
        title: data.productName, ...item
      })}>

        <CommentItem
          isLast={index === list.length - 1}
          avatarStyle={{ marginRight: 10, marginLeft: 15 }}
          key={item.id.toString()}
          name={item.nickname}
          date={item.postedDateTime}
          isReverse
          showComment={false}
          avatar={item.pic ? httpConfig.mediaUrl + item.pic : require('../../../assets/images/mine/defaultAvatar.png')}
          content={item.productReview}
        />
      </TouchableOpacity>
    ))}
    <ButtonListFooter content="查看全部评论" onPress={gotoAllComments}/>
  </View>
)

const styles = StyleSheet.create({
  comments: {
    backgroundColor: '#fff',
    paddingTop: 18,
    marginBottom: 60,
    marginTop: 10,
  },
  titleLayer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 15,
    marginBottom: 12,
  },
  pic: {
    width: 155,
    height: 100,
    marginRight: 8,
  },
  btn: {
    borderRadius: 20,
    paddingVertical: 2,
    backgroundColor: '#FC5869',
  },
})

export default Comments
