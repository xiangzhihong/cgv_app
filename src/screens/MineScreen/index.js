import React, { useEffect } from 'react'
import {Modal, View, BackHandler, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Avatar from '../../common/Avatar'
import HeaderContainers from './containers/HeaderContainers'
import TopNavContainers from './containers/TopNavContainers'
import MyRightContainer from './containers/MyRightContainer'
import AboutContainers from './containers/AboutContainers'
import MovieSeenContainers from './containers/MovieSeenContainers'
import {defaultAvatar} from '../../assets/images/mine'
import JPush from 'jpush-react-native'
import httpConfig from "../../api/httpConfig";


const MineScreen = ({ route, thatCd, navigation: { navigate }, isLoggedIn, userInfo, updateUserInfoInRedux: _updateUserInfoInRedux }) => {
  const [show, setShow] = React.useState(false)
  const [mesageReadStatus, setMesageReadStatus] = React.useState(false)

  useEffect(() => {
    const tagAliasListener = result => {
      console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(tagAliasListener);
  }, [isLoggedIn])

  const initData = async () => {

  }

  const goto = (routeName) => {

  }

  return (
    <ScrollView
      footer={<QrCodeModal userInfo={userInfo} show={show} onHide={() => setShow(false)} />}>
      <HeaderContainers isLogin={false} userInfo={userInfo} loadData={initData} goto={goto} onQrcodePress={() => setShow(true)} />
      <TopNavContainers navigate={navigate} goto={goto} />
      <MyRightContainer goto={goto} />
      <View style={{height: 10, width: '100%'}}/>
      <MovieSeenContainers isLogin={isLoggedIn} userInfo={userInfo} goto={goto} />
      <AboutContainers thatCd={thatCd} isLoggedIn={isLoggedIn} goto={goto} status={mesageReadStatus}/>
    </ScrollView>
  )
}

const QrCodeModal = (
  {
    userInfo: { vip, nickname, pic },
    show,
    onHide,
  },
) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={show}
      onRequestClose={onHide}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Avatar source={pic ? { uri: httpConfig.mediaUrl + pic } : defaultAvatar} />
            <Text>{nickname}</Text>
          </View>
          <QRCode value={vip} size={175} />
          <Text type="subheading" style={{ marginTop: 5 }}>{vip}</Text>
          <Text type="label" style={{ marginTop: 6 }}>请向影院工作人员出示二维码</Text>
          <TouchableOpacity onPress={() => onHide()} style={{ position: 'absolute', top: 15, right: 15, paddingLeft: 20, paddingBottom: 10 }}>
            <AntDesign name="close" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 24,
    alignItems: 'center',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default MineScreen

