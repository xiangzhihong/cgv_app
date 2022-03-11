import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, Image,TouchableOpacity} from 'react-native'
import Button from '../../common/Button/Button'
import PhoneNumberInput from '../../common/PhoneNumberInput'
import {navigate, tools} from '../../utils'
import LoginLogo from '../../common/LoginLogo'
import AntDesign from "react-native-vector-icons/AntDesign";

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')

const TAG_QQ = 0
const TAG_SINA = 1
const TAG_WECHAT = 2

const IconBtn = ({source, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <Image
            style={styles.iconImg}
            source={source}
        />
    </TouchableOpacity>
)

const LoginScreen = ({navigation, signInSuccess: _signInSuccess}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [check, setCheck] = useState(false)

    useEffect(() => {

    }, [])

    const submitPhoneNumber = () => {
        const reg = new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$')
        if (reg.test(phoneNumber)) {
            navigation.replace('LoginVerificationCodeScreen')
        } else {
            tools.Toast.toast('手机号格式不正确', 1)
        }
    }

    const onCheckBoxTap = () => {
       setCheck(!check)
    }

    const loginByThird = (tag) => {
        tools.Toast.toast(tag === 0 ? '请先安装QQ' : tag === 1 ? '请先安装微博' : '请先安装微信', 1)
    }


    function renderClose() {
        return (<TouchableOpacity onPress={navigation.goBack} style={styles.close}>
            <AntDesign name="close" color={'#222'} size={20} style={styles.closeBtn}/>
        </TouchableOpacity>);
    }

    return (
        <View style={styles.contain}>
            {renderClose()}
            <LoginLogo/>
            <PhoneNumberInput tip="未注册的手机号码会自动帮您注册" onChangeText={setPhoneNumber}/>
            <View style={styles.btnLayer}>
                <Button title="获取短信验证码" disabled={phoneNumber.length !== 11} style={styles.codeBtn} onPress={submitPhoneNumber} />
                <Text style={styles.otherBtnText} >本机号码一键登录</Text>
            </View>

            <View style={styles.bottomTotal}>
                <View style={styles.divideLayer}>
                    <View style={styles.divide}/>
                    <Text style={styles.otherMethod}>其他登录方式</Text>
                    <View style={styles.divide}/>
                </View>
                <View style={styles.bottom}>
                    <IconBtn source={require('../../assets/images/login/wechat.png')}
                             onPress={() => loginByThird(TAG_WECHAT)}/>
                    <IconBtn source={require('../../assets/images/login/blog.png')} onPress={() => loginByThird(TAG_SINA)} />
                    <IconBtn source={require('../../assets/images/login/qq.png')}
                             onPress={() => loginByThird(TAG_QQ)}/>
                </View>
                <View style={styles.agree}>
                    <TouchableOpacity style={styles.checkStyle} onPress={onCheckBoxTap}>
                        {
                            check? <Image style={{width: 16, height: 16}} source={require('../../assets/images/common/check.png')}/>
                                :<Image  style={{width: 16, height: 16}} source={require('../../assets/images/common/uncheck.png')}/>
                        }
                    </TouchableOpacity>

                    <Text style={styles.agreeText}>登录即代表同意</Text>
                    <TouchableOpacity onPress={() => navigate('UserAgreementScreen')}>
                        <Text style={[styles.agreeText, styles.link]}>《CGV用户协议》</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('UserPrivacyScreen')}>
                        <Text style={[styles.agreeText, styles.link]}>《用户隐私制度》</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        backgroundColor: '#fff',
        flex: 1,
    },
    close: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        height: 25,
        width: 25,
    },
    btnLayer: {
        marginTop: 48,
        marginBottom: 100,
    },
    codeBtn: {
        backgroundColor: '#FC5869',
        borderRadius: 25,
        width: '90%',
        alignSelf: 'center',
        alignItems:'center',
        marginBottom: 5,
    },
    codeTxt: {
        color:'#fff',
        fontSize: 14
    },
    otherBtnText: {
        color: '#777777',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:3,
        fontSize:16
    },
    otherMethod: {
        flex: 1,
        color: '#ccc',
        alignSelf: 'center',
        textAlign: 'center',
    },
    divideLayer: {
        flexDirection: 'row',
        marginRight: 20,
        marginLeft: 20,
        height: 16,
    },
    divide: {
        flex: 1,
        height: 1,
        backgroundColor: '#EFEFEF',
        alignSelf: 'center',
    },
    bottomTotal: {
        alignItems: 'center',
        marginBottom: 15,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    checkStyle:{
        alignItems: 'center',
        marginRight: 3
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: deviceWidth * 0.6,
        marginTop: 29,
        marginBottom: 29,
    },
    iconImg: {
        height: 44,
        width: 44,
    },
    agree: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 16,
        marginBottom: 15,
        color: '#999',
    },
    agreeText: {
        alignSelf: 'center',
        fontSize: 12,
        textAlign: 'center',
        color: '#999',
    },
    link: {
        color: '#5B8EDC',
    },
})

export default LoginScreen;
