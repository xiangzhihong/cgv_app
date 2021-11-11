import React, { useContext, useEffect } from 'react'
import {TouchableOpacity,Text,Button, StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Entypo'
import CommentItem from '../../../../common/CommentItem'
import SectionHeader from './SectionHeader'
import { tools } from '../../../../utils'
import apiRequest from "../../../../api";

const Comment = ({
  commentList = [1, 2, 3, 4],
  onSectionHeaderPress,
  onItemPress,
  onPressBottom,
  onPraisePress,
}) => {
  const { colors } = useTheme()

  const report = async (data) => {
    try {
      let param = {
        textValue: '',
        complaintType: '1',
        targetId:data.id,
      };
      const res=apiRequest.post('/product/product-reviews/ext/saveProductReviewComplaint',param)
      if (res.code === 200) {
        tools.Toast.toast('举报成功',1)
      } else {
        if(res.message != null && res.message !== '') {
          tools.Toast.toast(res.message, 1)
        } else {
          tools.Toast.toast("正在审核中", 1)
        }
      }
    } catch (e) {
      console.log(e)
      tools.Toast.toast('正在审核', 1)
    }
  }

  const renderItem = (item = {}, index) => {
    const isLast = commentList.length - 1 === index
    const { nickname = '', productReview = '', postedDateTime, myLike = {},productRating } = item
    const date = moment(postedDateTime).format('YYYY-MM-DD')
    const { productLike = '0' } = myLike || {}

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onItemPress(item)} key={index}>
        <CommentItem
          onReportPress={report}
          isLast={isLast}
          avatarStyle={{ marginRight: 10 }}
          key={index.toString()}
          name={nickname}
          date={date}
          showPraise
          showReport
          isPraised={productLike === '1'}
          onPraisePress={onPraisePress}
          praiseNumber={item.likeCnt}
          commentNumber={item.replyCnt}
          avatar={tools.getImage(item.pic)}
          content={productReview}
          data={item}
          productRating={productRating}
          isShowProductRating={true}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: '#fff', marginBottom: 5 }}>
      <SectionHeader
        title="电影评论"
        renderRight={() =>
          <Button onPress={onSectionHeaderPress} textStyle={{ fontSize: 13 }} style={[styles.button, { backgroundColor: colors.activeTintColor }]} title="发表评论" />
        }
      />
      <View style={{ paddingLeft: 15 }}>
        {
          commentList.length === 0 ? <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}><Text type="label">暂无评论</Text></View> :
            commentList.map((item, index) =>
              renderItem(item, index),
            )
        }
      </View>
      <TouchableOpacity activeOpacity={0.7} style={styles.viewMore} onPress={onPressBottom}>
        <Text type="normal" style={{ color: '#999' }}>查看全部电影评论</Text>
        <Icon name="chevron-thin-right" size={14} color="#ccc" />
      </TouchableOpacity>
    </View>
  )
}

export default Comment

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
