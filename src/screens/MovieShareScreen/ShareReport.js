import {Dimensions, Image, Text, View, ScrollView} from 'react-native'
import React from 'react'
import {bizstream} from '../../bizstream'

const {width, height} = Dimensions.get('window')

const ShareReport = (
    {
        type, item,
        value, onChangeText,
        footer = null, coverStyle = {},
        bottomContainerStyle,
        onCapture,
        assignRef,
        data,
        checkList,
        ...props
    },
) => {

    return (
        <View style={{width, backgroundColor: '#924040'}}>
            <ScrollView>
                <View style={{width}} collapsable={false} ref={component => assignRef && assignRef(component)}>
                    <View style={{
                        marginHorizontal: 15,
                        borderRadius: 3,
                        marginTop: 30,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 12, color: '#666', marginTop: 20}}>今年我在CGV看了{data.movCount}部电影</Text>
                        <Text style={{fontSize: 14, color: '#000', marginTop: 10, marginBottom: 12}}>我的年度关键词</Text>
                        <Image
                            resizeMode="cover"
                            style={{width: width * 0.85, height: width * 0.85 * 0.7, borderRadius: 4}}
                            source={{uri: bizstream.getMediaUrl() + checkList[0].image}}/>
                        <Text style={{
                            fontSize: 30,
                            color: '#000',
                            marginTop: 15,
                            marginBottom: 10
                        }}>{data?.keyWord}</Text>
                        <Text style={{fontSize: 14, color: '#000', marginBottom: 8}}>{checkList[0]?.description}</Text>
                        <Text style={{
                            fontSize: 14,
                            color: '#000',
                            paddingBottom: 20
                        }}>-《{checkList[0]?.productName}》</Text>
                    </View>
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center', marginVertical: 20}}>我的推荐名单</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {
                            checkList.map((ite, indx) => (
                                <View
                                    key={indx}
                                    style={{
                                        width: 108,
                                        marginHorizontal: 7,
                                        marginBottom: 15,
                                        alignItems: 'center',
                                        marginLeft: indx === 0 ? 100 : null,
                                        marginRight: indx === 0 ? 100 : null,
                                    }}>
                                    <Image
                                        style={{width: 108, height: 160}}
                                        source={{uri: bizstream.getMediaUrl() + ite.image}}/>
                                    <Text style={{
                                        textAlign: 'center',
                                        marginTop: 5,
                                        fontSize: 12,
                                        color: '#fff'
                                    }}>{ite.productName}</Text>
                                </View>
                            ))
                        }
                    </View>
                    {footer}
                </View>
            </ScrollView>
        </View>
    )
}


export default ShareReport

