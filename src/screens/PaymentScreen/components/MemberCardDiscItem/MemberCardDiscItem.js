import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Dimensions} from 'react-native'
import SectionHeader from '../../../../common/SectionHeader'
import { navigate } from '../../../../utils'

const {width} = Dimensions.get('window')

const MemberCardDiscItem = ({
  items,
  current,
  usableMemberCards,
  selectedItem,
  bestDiscounts,
  specialPromoArr,
  getDscResult: _getDscResult,
  ...props
}) => {

  useEffect(() => {

  }, [])

  return (
    <View>
      <SectionHeader title="朋友卡优惠" isRenderRight isRenderButton onClick={() => navigate('ModalCGVPayScreen', {
        items: usableMemberCards,
        confirm: (data)=> _getDscResult(data),
        status: 5,
        title: '使用朋友卡',
        addCard: false,
        mepty: '您还没有朋友卡～'
      })}/>
      {current.ticketOrder.memberCard.memberCardDiscountAmount ? <View style={[styles.discountLine, {justifyContent: 'space-around'}]}>
        <Text type='subheading' style={styles.discountName}>{current.ticketOrder.memberCard.memberCardName}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text type='bodyheading' style={[styles.discountName,{width: 20, textAlign: 'left'}]}>X1</Text>
          <Text type='subheading' style={[styles.discountAmount, {width: 100, textAlign: 'right'}]}>-￥{current.ticketOrder.memberCard.memberCardDiscountAmount}</Text>
        </View>
      </View>: null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: '#999',
  },
  rightIcon: {
    color: '#ccc',
    fontSize: 15,
  },
  popupHeaderText: {
    textAlign: 'center'
  },
  popupFooterContainer: {
    padding: 16
  },
  popupBodyText: {
    color: '#777',
    paddingLeft: 16,
    paddingRight: 16
  },
  popupItemBodyRight: {
    textAlign: 'right'
  },
  popupItemBodyText: {
    color: 'rgba(255,255,255,1)',
    opacity: 0.75
  },
  popupItemFooterText: {
    color: 'rgba(255,255,255,1)',
    opacity: 0.75
  },
  sectionTitle: {
    color: '#222',
  },
  discountLine: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18
  },
  discountName: {
    width: 180,
    height: 29,
    lineHeight: 29,
    color: '#777',
  },
  discountAmount: {
    width: 50,
    height: 29,
    lineHeight: 29,
    textAlign: 'right',
    color: '#F1A23D',
    marginRight: 5,
  },
  detailLine: {
    width: width - 22,
    height: 1.5,
    backgroundColor: '#EFEFEF',
    left: -10,
    marginTop: 10,
    marginBottom: 10,
  },
  detailBottom: {
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-start',
    paddingRight: 12
  },
  detailBottomText1: {
    lineHeight: 44,
    color: '#222',
    width: 45,
    textAlign: 'left',
  },
  detailBottomText2: {
    lineHeight: 44,
    color: '#222',
  },
  detailBottomText3: {
    lineHeight: 42,
    color: '#222',
  },
  topicImg: {
    width: 100,
    height: 142,
    borderRadius: 3,
    overflow: 'hidden'
  },
  input: {
    width: '67%',
    height: 46,
    backgroundColor: '#fff',
    padding: 0,
    paddingBottom: 0,
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    marginEnd: 12,
  },
  rightIconContainer: {
    marginStart: 8,
  },
  headerView: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftIcon: {
    width: 15,
    height: 13,
    marginLeft: 15,
    marginRight: 5
  },
})


export default MemberCardDiscItem
