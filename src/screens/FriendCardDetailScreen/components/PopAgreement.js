import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

const PopAgreement = () => (
  <View style={styles.box} onStartShouldSetResponderCapture={() => true}>
    <ScrollView >
      <Text style={styles.popContent}>1. 适用范围</Text>
      <Text style={styles.popContent}>该卡为电子权益卡，适用于全国CGV影城购买影票或指定商品时享受优惠折扣或权益（部分电子朋友卡不适用于广州K11影城，广州K11影城发售的E优卡全国影城通用）。</Text>
      <Text style={styles.popContent} />
      <Text style={styles.popContent}>2. 优惠政策</Text>
      <Text style={styles.popContent}>每日持卡消费，可享受相应折扣优惠：线上&线下限购电影票张数合计6张/天/卡；线下购买部分商品套餐85折，限购3套/天/卡，超出限购数量时，以正价购买；</Text>
      <Text style={styles.popContent} />
      <Text style={styles.popContent}>3. 用卡规则</Text>
      <Text style={styles.popContent}>1）购买成功后，朋友卡将自动绑定至您下单时使用的账户手机号（请至CGV影城APP-我的-朋友卡中查看）；</Text>
      <Text style={styles.popContent}>2） 朋友卡可在线上（CGV影城官方APP、小程序）&线下（影城现场）使用，为确保您的用卡权益，请您在线下使用时，提前出示您的朋友卡二维码（请至CGV影城APP-我的-朋友卡中查看），并需输入密码进行验证（线上购卡密码默认为账户手机号后6位数）；</Text>
      <Text style={styles.popContent}>3） 如需变更账户手机号，须由本人携带身份证至影城办理变更登记；</Text>
      <Text style={styles.popContent}>4） 凭朋友卡享受相关权益时，部分影城优惠不可与其同享，详见影城活动说明；朋友卡持卡权益详见“PACONNIE CLUB”活动规则及影城现场公告；</Text>
      <Text style={styles.popContent}>5） 为充分保证您的权益，请勿借予他人使用。</Text>
      <Text style={styles.popContent} />
      <Text style={styles.popContent}>4. 卡有效期</Text>
      <Text style={styles.popContent}>朋友卡有效期为：季度卡（3个自然月）、半年卡（6个自然月）、一年卡（12个自然月）；所有权益，到期自动失效</Text>
      <Text style={styles.popContent}>有效期计算方式：</Text>
      <Text style={styles.popContent}>1）选择立即办卡/赠送好友时，有效期自开卡之日起计算；</Text>
      <Text style={styles.popContent}>2）选择立即续卡时，可选择其中一张进行延期，有效期自动累积；</Text>
      <Text style={styles.popContent} />
      <Text style={styles.popContent}>5. 使用说明</Text>
      <Text style={styles.popContent}>1） 线上朋友卡可在全国影城现场通用，但由于各地价格体系/影城级别不同，当在跨城市/影城消费时，以实际消费的影城规定享受具体优惠折扣；</Text>
      <Text style={styles.popContent}>2） 线上朋友卡均为权益卡，卡费为权益费，不得折抵现金使用，一经使用，非法律规定事由，不可退换；</Text>
      <Text style={styles.popContent}>3） 如遇发行方或原先规定的影片最低票价超过持卡优惠价时，观众须按影片最低票价付款；</Text>
      <Text style={styles.popContent}>4） 请您开通朋友卡前详细查看<Text onPress={() => {}} style={styles.link}>《隐私权政策书》</Text>，如果您愿意继续加入，视为您已经充分了解并认可前述政策。</Text>
    </ScrollView>
  </View>
)

const styles = StyleSheet.create({
  box: {
    height: 200,
  },
  popContent: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    width: '100%',
  },
  link: {
   color: '#389AFC'
  },
})

export default PopAgreement
