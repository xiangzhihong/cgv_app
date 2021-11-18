import React from 'react'
import {View, StyleSheet, Dimensions, Text, TextInput,} from 'react-native'
import StarRating from 'react-native-star-rating'
import {tools} from '../../utils'

const {width: clientWidth, height} = Dimensions.get('window')

let TextText = ''
const inputRef = React.createRef()

const PublishCommentScreen = ({route, navigation, getMovieCommentList: _getMovieCommentList}) => {
    const {params = {}} = route
    const {movieId, type} = params
    const [starCount, setStarCount] = React.useState(5)
    const [loading, setLoading] = React.useState(false)
    const [commentContent, setCommentContent] = React.useState('')

    React.useEffect(() => {
        navigation.setParams({
                rightPress: publishComment
            },
        )
    }, [movieId, starCount])
    const publishComment = async () => {
        try {
            if (loading) return null
            if (TextText.trim().length === 0) {
                tools.Toast.toast('请输入您的评价', 1)
                return null
            }
            if (TextText.length > 50) {
                tools.Toast.toast('最多输入50个字符', 1)
                return null
            }
            tools.loading()
            setLoading(true)
            inputRef?.current.blur()
            tools.Toast.toast('发布成功', 1)
            navigation.goBack()
            setLoading(false)
            global.siblingLoad.destroy()
        } catch (e) {
            tools.Toast.toast('发布失败，请稍后再试！', 1)
        } finally {
            setLoading(false)
            global.siblingLoad.destroy()
        }
    }

    const getComment = () => {
        if (starCount <= 1) {
            return '超烂啊'
        }
        if (starCount <= 2) {
            return '比较差'
        }
        if (starCount <= 3) {
            return '一般般'
        }
        if (starCount <= 4) {
            return '比较好'
        }
        return '完美'

    }

    return (
        <View>
            <View style={[styles.topContainer, {backgroundColor: '#fff'}]}>
                <Text type="heading" bold style={[{color: '#FEAE04'}]} onPress={() => console.log(commentContent)}>
                    {starCount * 2}分
                </Text>
                <Text type="body"
                      style={styles.comment}>
                    {getComment()}
                </Text>
                <View style={{width: clientWidth - 200, height: 30}}>
                    <StarRating
                        halfStarEnabled
                        disabled={false}
                        starSize={30}
                        maxStars={5}
                        rating={starCount}
                        selectedStar={rating => setStarCount(rating)}
                        fullStarColor="#FEAE04"
                        activeOpacity={0.2}
                    />
                </View>
            </View>
            <View style={[styles.areaContainer, {backgroundColor: '#fff'}]}>
                <TextInput
                    loading={loading}
                    ref={inputRef}
                    textAlignVertical='top'
                    maxLength={50}
                    style={styles.textArea}
                    multiline
                    placeholderTextColor="#999"
                    placeholder="电影好看吗？写下你的评论...."
                    onChangeText={(e) => {
                        TextText = e
                        if (TextText.length > 50) {
                            tools.Toast.toast('最多输入50个字符', 1)
                            return false;
                        }
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    comment: {
        textAlign: 'center',
        lineHeight: 16,
        fontWeight: '400',
        marginTop: 3,
        marginBottom: 10,
    },
    areaContainer: {
        marginTop: 10,
        flex: 1,
        padding: 15,
    },
    textArea: {
        flex: 1,
    },
})

export default PublishCommentScreen
