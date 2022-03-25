import React from 'react'
import {
    Dimensions,
    View,
    Linking,
    TouchableWithoutFeedback,
    NativeModules,
    Platform,
    Image,
    Text,
    StyleSheet, ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import ListItem from '../../common/ListItem'
import logo from '../../assets/images/about/logo.png'
import qrcode from '../../assets/images/about/qrcode.png'
import {tools} from '../../utils'
import {goBack} from '../../utils/rootNavigation'
import apiRequest from "../../api";
import httpConfig from "../../api/httpConfig";
import {strings} from '../../i18n'

const {width} = Dimensions.get('window')

const AboutScreen = ({navigation}) => {

    const DATAS = [
        {
            id: 1,
            text: <Text>{strings('official')}</Text>,
            right: <Text>{strings('cgvLink')}</Text>,
        },
        {
            id: 2,
            text: <Text>{strings('wechat')}</Text>,
            right: <Text>{strings('cgv')}</Text>,
        },
        {
            id: 3,
            text: <Text>{strings('weibo')}</Text>,
            right: <Icon name="chevron-thin-right" size={10} color="#ccc"/>,
        },
    ]

    const versionUpdate = async () => {
        try {
            const version = '4.0.0'
            let url = Platform.OS === 'ios' ? '/api/version/01' : '/api/version/02'
            const res = await apiRequest.get(url)

            if (res.verNm !== version) {
                const verDesc = res.verDesc
                tools.alert(`${verDesc}`, '更新提示', res.updTyp === '01' ? [{
                    text: '确定', onPress: () => {
                        goBack()
                        // if (Platform.OS === 'ios') {
                        //   Linking.openURL('https://apps.apple.com/cn/app/cgv%E7%94%B5%E5%BD%B1/id687193022')
                        // } else {
                        //   NativeModules.DownloadApk.downloading(`${httpConfig.mediaUrl}${res.filePath}`, 'file.apk')
                        // }
                    },
                }] : [{text: '取消', onPress: null, style: 'cancel'}, {
                    text: '下载安装', onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('https://apps.apple.com/cn/app/cgv%E7%94%B5%E5%BD%B1/id687193022')
                        } else {
                            NativeModules.DownloadApk.downloading(`${httpConfig.mediaUrl}${res.filePath}`, 'file.apk')
                            tools.Toast.toast('下载中！', 1)
                            goBack()
                        }
                    },
                }], {}, `${res.updTyp}`, res.updTyp === '01' ? false : true)
            } else {
                tools.Toast.toast('已是最新版本', 1)
            }

        } catch (e) {
            console.log(e)
        }
    }

    // 下载新app
    const versionDownload = async () => {
        try {
            let url = Platform.OS === 'ios' ? '/api/version/01' : '/api/version/02'
            const res = await apiRequest.get(url)
            const verDesc = res.verDesc
            const filePath = res.filePath

            tools.alert(
                `${verDesc}`,
                '下载提示',
                [
                    {text: '取消', onPress: null, style: 'cancel'},
                    {
                        text: '下载安装',
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('https://apps.apple.com/cn/app/cgv%E7%94%B5%E5%BD%B1/id687193022')
                            } else {
                                NativeModules.DownloadApk.downloading(`${httpConfig.mediaUrl}${filePath}`, 'file.apk')
                                tools.Toast.toast('下载中！', 1)
                                goBack()
                            }
                        },
                    },
                ],
                {},
                `${res.updTyp}`,
            )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ScrollView style={styles.contain}>
            <View style={styles.logoCon}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <Text type="label" style={styles.version}>
                    V4.0.0
                </Text>
            </View>
            <ListItem
                isTitle
                isLast
                text={strings('update')}
                style={{marginTop: 10}}
                onPress={() => versionUpdate()}
                renderRight={() => (
                    <Icon name="chevron-thin-right" size={10} color="#ccc"/>
                )}
            />
            <View style={{marginTop: 10}}>
                {DATAS.map((item, index) => (
                    <ListItem
                        onPress={() =>
                            item.id === 3 ? Linking.openURL('https://weibo.com/cjcgv') : null
                        }
                        isTitle
                        isLast={DATAS.length - 1 === index}
                        key={index}
                        text={item.text}
                        renderRight={() => item.right}
                    />
                ))}
            </View>
            <ListItem
                onPress={() => navigation.navigate('UserAgreementScreen')}
                isTitle
                text={strings('userAgree')}
                style={{marginTop: 10}}
                renderRight={() => (
                    <Icon name="chevron-thin-right" size={10} color="#ccc"/>
                )}
            />
            <ListItem
                onPress={() => navigation.navigate('UserPrivacyScreen')}
                isTitle
                isLast
                text={strings('userPrivacy')}
                renderRight={() => (
                    <Icon name="chevron-thin-right" size={10} color="#ccc"/>
                )}
            />
            <View style={{alignItems: 'center', paddingVertical: 40}}>
                <TouchableWithoutFeedback onLongPress={() => {
                    versionDownload()
                }
                }>
                    <Image source={qrcode} style={{width: width / 3, height: width / 3}}/>
                </TouchableWithoutFeedback>
                <Text style={styles.copy}>
                    {strings('copy')}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: '#F3F4F5',
    },
    logoCon: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 40,
    },
    logo: {
        width: width / 3,
        height: (width / 3 / 276) * 134
    },
    version: {
        color: '#999',
        marginTop: 15
    },
    copy: {
        color: '#999',
        marginTop: 15
    },
    title: {
        backgroundColor: '#fff',
        padding: 5,
    },
})

export default AboutScreen;
