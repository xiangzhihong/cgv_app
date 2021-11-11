import React, {useEffect} from 'react'
import {View, Button, FlatList, Text, Image} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import ListItem from '../../../../common/ListItem'
import {topic, report} from '../../../../assets/images/mine'
import {navigate} from '../../../../utils'
import apiRequest from "../../../../api";
import httpConfig from "../../../../api/httpConfig";

export default ({goto, isLogin, userInfo}) => {
    const [seenMovieList, setSeenMovieList] = React.useState([])
    const [seenMovieReport, setSeenMovieReport] = React.useState([])

    useEffect(() => {
        getSeenMovie()
        annualReport()
    }, [])

    const getSeenMovie = async () => {
        if (isLogin) {
            try {
              const data = await apiRequest.get('/order/api/saw');
                setSeenMovieList(data)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const annualReport = async () => {
        if (isLogin) {
            try {
                const data = await apiRequest.get('/content/movie/annualReport')
                setSeenMovieReport(data.data)
                console.log(data, 'annualReport')
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        isLogin ?
            <View style={{marginTop: 10, backgroundColor: '#fff'}}>
                {seenMovieList && seenMovieList.length > 0 ? <View style={{paddingLeft: 15, paddingTop: 12}}>
                    <Text type="subheading" bold>看过的电影</Text>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#efefef', marginTop: 10}}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={seenMovieList}
                            renderItem={(item) =>
                                <View style={{marginRight: 10}}>
                                    <Image
                                        source={item?.item?.movUrl ? {uri: httpConfig.mediaUrl + item?.item?.movUrl} : require('../../../../assets/images/test/movie.png')}
                                        style={{width: 77, height: 110}}/>
                                    <Button onPress={() => {
                                        console.log(item?.item)
                                        navigate('PublishCommentScreen', {
                                            type: '1',
                                            title: `${item?.item?.movNm}的评论`,
                                            movieId: item?.item?.movId
                                        })
                                    }} textStyle={{fontSize: 13}} title="评论" style={{
                                        borderRadius: 20,
                                        padding: 0,
                                        marginHorizontal: 12,
                                        paddingVertical: 4,
                                        marginTop: 10,
                                        marginBottom: 15
                                    }}/>
                                </View>}
                        />
                    </View>
                </View> : null}
                <ListItem
                    onPress={() => navigate('MyCommentAndTopicScreen', {data: null, userInfo})}
                    renderRight={() => <Icon name="chevron-thin-right" size={13} color="#ccc"/>}
                    textStyle={{marginLeft: 8, fontSize: 14, color: '#333'}}
                    text="我的评论与话题"
                    renderIcon={() => <Image source={topic} style={{width: 20, height: 20}}/>}
                />
                {
                    seenMovieReport &&
                    <ListItem
                        onPress={() => navigate('MyCommentAndTopicScreen', {
                            data: seenMovieReport,
                            userInfo,
                            title: '我的年度观影报告'
                        })}
                        isLast
                        renderRight={() => <Icon name="chevron-thin-right" size={13} color="#ccc"/>}
                        textStyle={{marginLeft: 8, fontSize: 14, color: '#333'}}
                        text="年度观影报告"
                        renderIcon={() => <Image source={report} style={{width: 20, height: 20}}/>}
                    />
                }

            </View> : null
    )
}
