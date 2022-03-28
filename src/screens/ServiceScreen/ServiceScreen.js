import React, { useEffect, useState } from 'react'
import { StyleSheet,View } from 'react-native'
import ListItem from '../../common/ListItem'
import ListItemRight from '../../common/ListItemRight'
import apiRequest from "../../api";

const ServiceScreen = ({ navigation: { navigate }, route }) => {
  const {params:{thatCd}}=route
  const [num, setNum] = useState(0)
  const [ticketGuideList, setTicketGuide] = useState([])
  const serviceUrl="https://cgvnet.s4.udesk.cn/im_client/?web_plugin_id=17904&minicode=051D7M0w3COleY2cG20w3b9f7Z2D7M03"

  useEffect(() => {
    getSuggestionsNum()
    getContentInstructions()
  }, [])

  const getSuggestionsNum = async () => {
    let url = '/api/claim/list'
    const res = await apiRequest.get(url)
    setNum(res.ddhf)
  }

  const getContentInstructions = async () => {
    let url = '/content/instructions/selectInstructions'
    const res = await apiRequest.get(url)
    setTicketGuide(res)
  }

  return (
    <View>
      <ListItem textStyle={styles.textStyle} text="常见问题" onPress={() => navigate('QAScreen')} renderRight={() => <ListItemRight />} />
      <ListItem textStyle={styles.textStyle} text="改善建议" onPress={() => navigate('ComplaintsSuggestionsScreen', {thatCd})} renderRight={() => <ListItemRight value={num && `${num}条`} />} />
      <ListItem textStyle={styles.textStyle} text="在线客服" onPress={() => navigate('PromotionWebviewScreen', {serviceUrl})} renderRight={() => <ListItemRight />}  />
      <ListItem textStyle={styles.textStyle} text="客服热线" onPress={() => navigate('TicketGuideScreen', ticketGuideList)} renderRight={() => <ListItemRight showArrow={false} value={'400-718-5575'}/>}  />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: '#222',
  },
})

export default ServiceScreen
