import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, PermissionsAndroid, Platform, TouchableOpacity} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import {useHeaderHeight} from '@react-navigation/stack';
import ViewShot, {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Empty from '../../common/Empty';
import {tools} from '../../utils';
import ShareCustom from './ShareCustom';
import ShareComment from './ShareComment';

const {width, height} = Dimensions.get('window');
let viewShots = null;

const MovieShareScreen = ({
                              route,
                              navigation,
                              userInfo,
                              isLogin,
                          }) => {
    const {params} = route;
    const {
        type = 'movie',
        title = '',
        description = '',
        activeIndex = 0,
        data,
        images
    } = params;
    const HeaderHeight = useHeaderHeight();
    const CarouselHeight = ((height - HeaderHeight) / 4) * 3;
    const [value, setValue] = React.useState('');
    const [activeData, setActiveData] = React.useState(images?.length > 0 ? images[activeIndex] : {});
    const [show, setShow] = React.useState(false);
    const onChangeText = (e) => {
        setValue(e);
    };

    const sliderItem = ({item, index}) => {
        return type !== 'movie' ? (
            <ShareComment item={item} data={params} userInfo={userInfo}/>
        ) : (
            <ShareCustom
                userInfo={userInfo}
                value={value}
                type={type}
                description={description}
                item={item}
                onChangeText={onChangeText}
            />
        );
    };

    const onShare = () => {
        tools.startAnimation(setShow(true));
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: '申请手机存储权限',
                    message: '',
                    buttonNeutral: '等会再问我',
                    buttonNegative: '不行',
                    buttonPositive: '好吧',
                },
            );
        }
        tools.alertShare(onItemPress, () => {
            tools.startAnimation(setShow(false));
        });
    };


    const onItemPress = async (platform) => {
        if (!isLogin) {
            tools.alertShare(onItemPress, () => {
                tools.startAnimation(setShow(false));
            });
            return navigation.navigate('MyModal', {screen: 'LoginScreen'});
        }

        try {
            const res = await captureRef(viewShots, {
                format: 'jpg',
                quality: 1,
            });
            if (res) {
                if (platform < 0) {
                    await CameraRoll.save(res, {type: 'photo'});
                    tools.Toast.toast('保存成功', 1);
                    return null;
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View>
            {images?.length === 0 ? (
                <View>
                    <Empty title="本电影暂无剧照~"/>
                </View>
            ) : (
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View
                        style={{
                            height: CarouselHeight,
                            paddingTop: 48,
                            top: 0,
                        }}>
                        <Carousel
                            layout="default"
                            data={images}
                            firstItem={activeIndex}
                            removeClippedSubviews={false}
                            onScrollIndexChanged={(e) => setActiveData(images?.length > 0 ? images[e] : {})}
                            sliderWidth={width}
                            itemWidth={width - (type !== 'movie' ? 120 : 80)}
                            renderItem={sliderItem}
                        />
                    </View>
                    <Text style={styles.bottomTxt}>左右滑动可更换电影海报~</Text>
                    <TouchableOpacity style={styles.bottomBtn} onPress={onShare}>
                        <Text style={{color: '#fff'}}>分享</Text>
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    posterDefault: {
        width: '100%',
    },
    posterComment: {
        width: '100%',
        height: '30%',
    },
    poster: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    commentContainer: {
        paddingVertical: 20,
        flex: 1,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    commentAvatar: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
    name: {
        textAlign: 'center',
        marginLeft: 6,
    },
    bottomInfo: {
        alignItems: 'flex-end',
    },
    bottomInfoTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    bottomBtn: {
        height: 30,
        width: 80,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E33322'
    },
    button: {
        width: width / 3,
        marginBottom: 20,
    },
    bottomTxt: {
        height: 20,
        marginTop: 10,
        alignSelf: 'center',
        color: '#000'
    },
    avatar: {
        width: 62,
        alignSelf: 'center',
        height: 62,
        borderRadius: 31,
        elevation: 30,
        shadowColor: 'rgba(0,0,0, 1)',
        shadowOffset: {width: 0, height: 600},
        shadowOpacity: 1,
    },
});


export default MovieShareScreen;
