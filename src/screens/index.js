import * as React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import AllMovieScreen from '../screens/AllMovieScreen/AllSellMovieScreen';
import CitySelectScreen from "./CitySelectScreen";
import PromotionDetailScreen from "./PromotionDetailScreen/PromotionDetailScreen";
import SelectorScreen from "./SelectorScreen/SelectorScreen";
import MovieDetailScreen from "./MovieDetailScreen";
import AllStillScreen from "./MovieStillScreen/AllStillScreen";
import StillShareScreen from "./MovieStillScreen/StillShareScreen";
import AllCommentScreen from "./CommentScreen/AllCommentScreen";
import PublishCommentScreen from "./CommentScreen/PublishCommentScreen";
import PersonalCommentScreen from "./CommentScreen/PersonalCommentScreen";
import AllTopicScreen from "./TopicScreen/AllTopicScreen";
import PersonalTopicScreen from "./TopicScreen/PersonalTopicScreen";
import FriendCardListScreen from "./FriendCardListScreen/FriendCardListScreen";
import MovieShareScreen from "./MovieShareScreen";
import MovieAndCinemaScreen from "./MovieAndCinemaScreen";
import SelectSessionScreen from "./SelectSessionScreen";
import CinemaDetailScreenPic from "./CinemaDetailScreen/CinemaDetailScreenPic";
import CinemaDetailScreen from "./CinemaDetailScreen";
import GoodListScreen from "./GoodListScreen";
import GoodDetailScreen from "./GoodDetailScreen";
import ShopingCartScreen from "./ShopingCartScreen";
import SelectSeatScreen from "./SelectSeatScreen";
import PaymentScreen from "./PaymentScreen/PaymentScreen";
import ModalCGVPayScreen from "./ModalCGVPayScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import LoginVerificationCodeScreen from "./LoginVerificationCodeScreen/LoginVerificationCodeScreen";
import UserAgreementScreen from "./UserAgreementScreen"
import UserPrivacyScreen from "./UserPrivacyScreen"
import FriendCardDetailScreen from "./FriendCardDetailScreen/FriendCardDetailScreen";
import AboutScreen from "./AboutScreen";
import ServiceScreen from "./ServiceScreen/ServiceScreen";
import PromotionWebviewScreen from "./PromotionDetailScreen/PromotionWebviewScreen";

export {
    ShopingCartScreen,
}

export const stacks = [
    {
        name: 'AllMovieScreen',
        component: AllMovieScreen,
        options: {headerShown: false},
    },
    {
        name: "CitySelectScreen",
        component: CitySelectScreen,
        options: {title: '选择城市'},
    },
    {
        name: 'PromotionWebviewScreen',
        component: PromotionWebviewScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '在线客服'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'PromotionDetailScreen',
        component: PromotionDetailScreen,
        options: {
            title: '活动详情',
        },
    },
    {
        name: 'SelectorScreen',
        component: SelectorScreen,
        options: (nav) => {
            const {route} = nav
            const {params = {}} = route
            const {
                title = '活动类型', onRightPress = () => {
                },
            } = params
            return {
                title,
                headerRight: () => (
                    <TouchableOpacity style={styles.button} onPress={onRightPress}>
                        <Text style={styles.txt}>确定</Text>
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'MovieDetailScreen',
        component: MovieDetailScreen,
        options: {headerShown: false},
    },
    {
        name: 'AllStillScreen',
        component: AllStillScreen,
        options: (nav) => {
            const {route} = nav
            const {params = {}} = route
            const {title = '剧照'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'StillShareScreen',
        component: StillShareScreen,
        options: (nav) => {
            const {route} = nav
            const {params = {}} = route
            const {title = '剧照'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'AllCommentScreen',
        component: AllCommentScreen,
        options: (nav) => {
            const {route, navigation} = nav
            const {params = {}} = route
            const {title = 'XX的电影评论', movieId, status, detail} = params
            return {
                title: status === 2 ? `${title}` : `${title}的电影评论`,
                headerTitleStyle: {
                    width: '95%'
                },
                headerRight: () =>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PublishCommentScreen', {title, movieId})
                        }}
                        activeOpacity={0.8}
                        style={{marginRight: 10}}>
                        <Text>发表评论</Text>
                    </TouchableOpacity>,
            }
        },
    },
    {
        name: 'PersonalCommentScreen',
        component: PersonalCommentScreen,
        options: ({route, navigation}) => {
            const {params = {}} = route
            const {title = 'XX的电影评论', images, productReview, status} = params
            return {
                title: status === 2 ? `${title}` : `${title}的电影评论`,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MovieShareScreen', {
                                ...params,
                                type: 'movie',
                                images,
                                productReview,
                            })
                        }}
                        activeOpacity={0.8}
                        style={{marginRight: 15}}>
                        <Image
                            source={require('../assets/images/movie/share_black.png')}
                            style={{width: 16, height: 16}}
                        />
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'FriendCardListScreen',
        component: FriendCardListScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '购买朋友卡'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'PublishCommentScreen',
        component: PublishCommentScreen,
        options: (nav) => {
            const {route, navigation} = nav
            const {params = {}} = route
            const {title = '电影名称', rightPress} = params
            return {
                title,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            rightPress && rightPress()
                        }}
                        activeOpacity={0.8}
                        style={{
                            fontFamily: Platform.OS === 'ios' ? null : '',
                            marginRight: 10,
                        }}>
                        <Text>发布</Text>
                    </TouchableOpacity>
                ),
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                        activeOpacity={0.8}
                        style={{marginLeft: 10}}>
                        <Text style={{fontFamily: Platform.OS === 'ios' ? null : ''}}>
                            取消
                        </Text>
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'AllTopicScreen',
        component: AllTopicScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = 'XX的话题'} = params
            return {
                title: `${title}的话题`,
            }
        },
    },
    {
        name: 'PersonalTopicScreen',
        component: PersonalTopicScreen,
        options: ({route, navigation}) => {
            const {params = {}} = route
            const {title = 'XX的话题讨论', images, description} = params
            return {
                title: '话题讨论',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MovieShareScreen', {
                                ...params,
                                type: 'bbb',
                                images,
                                productReview: description,
                            })
                        }}
                        activeOpacity={0.8}
                        style={{marginRight: 15}}>
                        <Image
                            source={require('../assets/images/movie/share_black.png')}
                            style={{width: 16, height: 16}}
                        />
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'MovieShareScreen',
        component: MovieShareScreen,
        options: (nav) => {
            const {route} = nav
            const {params = {}} = route
            const {title = '分享XXX', type} = params
            const targetTitle =
                type === 'movie' || type === 'report'
                    ? `分享${title}`
                    : `分享${title}的电影评论`
            return {
                title: targetTitle,
            }
        },
    },
    {
        name: 'MovieAndCinemaScreen',
        component: MovieAndCinemaScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '误杀'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'SelectSessionScreen',
        component: SelectSessionScreen,
        options: {title: '选择场次'},
    },
    {
        name: 'SelectSeatScreen',
        component: SelectSeatScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '选择座位'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'CinemaDetailScreen',
        component: CinemaDetailScreen,
        options: {title: '影院详情'},
    },
    {
        name: 'CinemaDetailScreenPic',
        component: CinemaDetailScreenPic,
        options: (nav) => {
            const {route} = nav
            const {params = {}} = route
            const {title = ''} = params
            return {
                title,
            }
        },
    },
    {
        name: 'GoodListScreen',
        component: GoodListScreen,
        options: ({navigation, route}) => {
            const {params = {}} = route
            const {update, type} = params
            return {
                title: '商品列表',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{paddingLeft: 10}}>
                        <Icon name="chevron-thin-left" size={20}/>
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'GoodDetailScreen',
        component: GoodDetailScreen,
        options: ({navigation, route}) => {
            const {params = {}} = route
            const {title = '商品详情', update, type} = params
            return {
                title,
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{paddingLeft: 10}}>
                        <Icon name="chevron-thin-left" size={20}/>
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'PaymentScreen',
        component: PaymentScreen,
        options: ({navigation, route}) => {
            const {params = {}} = route
            console.log('PaymentScreen:'+params)
            return {
                title: '订单确认',
                headerLeft: () => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{paddingLeft: 10}}>
                        <Icon name="chevron-thin-left" size={20}/>
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'ModalCGVPayScreen',
        component: ModalCGVPayScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '星意卡'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'FriendCardDetailScreen',
        component: FriendCardDetailScreen,
        options: ({route}) => {
            const {params = {}} = route
            const {title = '朋友卡详情'} = params
            return {
                title,
            }
        },
    },
    {
        name: 'LoginScreen',
        component: LoginScreen,
        options: {headerShown: false},
    },
    {
        name: 'LoginVerificationCodeScreen',
        component: LoginVerificationCodeScreen,
        options: {headerShown: false},
    },
    {
        name: 'UserAgreementScreen',
        component: UserAgreementScreen,
        options: {title: '用户协议'},
    },
    {
        name: 'UserPrivacyScreen',
        component: UserPrivacyScreen,
        options: {title: '用户隐私制度'},
    },
    {
        name: 'AboutScreen',
        component: AboutScreen,
        options: {title: '关于CGV'},
    },
    {
        name: 'ServiceScreen',
        component: ServiceScreen,
        options: {title: '客服'},
    },
];

const styles = StyleSheet.create({
    button: {
        marginRight: 15,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: '#FC5869',
    },
    txt: {
        color: '#fff'
    },
});
