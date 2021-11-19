import * as React from 'react';
import {View, TouchableOpacity, Text,Image, StyleSheet, Platform} from 'react-native';
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
            const { route, navigation } = nav
            const { params = {} } = route
            const { title = 'XX的电影评论', movieId, status, detail } = params
            return {
                title: status === 2 ? `${title}的评价` : `${title}的电影评论`,
                headerTitleStyle: {
                    width: '95%'
                },
                headerRight: () =>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PublishCommentScreen', { title, movieId })
                        }}
                        activeOpacity={0.8}
                        style={{ marginRight: 10 }}>
                        <Text>发表评论</Text>
                    </TouchableOpacity>,
            }
        },
    },
    {
        name: 'PersonalCommentScreen',
        component: PersonalCommentScreen,
        options: ({ route, navigation }) => {
            const { params = {} } = route
            const { title = 'XX的电影评论', images, productReview, status } = params
            return {
                title: status === 2 ? `${title}的评价` : `${title}的电影评论`,
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MovieShareScreen', {
                                ...params,
                                type: 'aaa',
                                images,
                                productReview,
                            })
                        }}
                        activeOpacity={0.8}
                        style={{ marginRight: 15 }}>
                        <Image
                            source={require('../assets/images/movie/share_black.png')}
                            style={{ width: 16, height: 16 }}
                        />
                    </TouchableOpacity>
                ),
            }
        },
    },
    {
        name: 'PublishCommentScreen',
        component: PublishCommentScreen,
        options: (nav) => {
            const { route, navigation } = nav
            const { params = {} } = route
            const { title = '电影名称', rightPress } = params
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
                        style={{ marginLeft: 10 }}>
                        <Text style={{ fontFamily: Platform.OS === 'ios' ? null : '' }}>
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
        options: ({ route }) => {
            const { params = {} } = route
            const { title = 'XX的话题' } = params
            return {
                title: `${title}的话题`,
            }
        },
    },
    {
        name: 'PersonalTopicScreen',
        component: PersonalTopicScreen,
        options: ({ route, navigation }) => {
            const { params = {} } = route
            const { title = 'XX的话题讨论', images, description } = params
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
                        style={{ marginRight: 15 }}>
                        <Image
                            source={require('../assets/images/movie/share_black.png')}
                            style={{ width: 16, height: 16 }}
                        />
                    </TouchableOpacity>
                ),
            }
        },
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
