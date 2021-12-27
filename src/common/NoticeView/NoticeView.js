import React from 'react'
import {View, ViewPropTypes, Alert, Image, Dimensions} from 'react-native'
import PropTypes from 'prop-types'
import {MarqueeVertical} from 'react-native-marquee-ab'
import {tools} from '../../utils'

const {width} = Dimensions.get('window');

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    direction: PropTypes.string,
    style: ViewPropTypes.style,
}

const defaultProps = {
    width: width,
    height: 40,
    direction: 'down',
    style: {},
}

const NoticeView = ({
                        notices, // Required prop
                        width, // Required prop
                        height, // Required prop
                        direction,
                        style,
                        itemStyle,
                        bgContainerStyle,
                    }) => {
    const formattedNotices =
        notices &&
        notices.map((item, index) => ({
            label: index,
            value: item.description,
        }))

    return (
        <View style={[style, styles.container]}>
            <Image
                source={require('../../assets/images/common/gonggao.png')}
                style={{width: 26, height: 13}}
            />
            <View
                style={[{
                    width: 2,
                    height: 15,
                    marginHorizontal: 7.5,
                }, itemStyle]}
            />
            <MarqueeVertical
                textList={formattedNotices}
                width={width - 100}
                height={height}
                direction={direction}
                bgContainerStyle={bgContainerStyle}
                textStyle={style}
                onTextClick={item => {
                    const alert = item.value
                    Alert.alert('公告', alert, [
                        {
                            text: '确定', onPress: () => {
                            }
                        },
                    ])
                }}

            />
        </View>

    )
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomWidth: tools.minLineHeight(),
        borderColor: '#E5E5E5',
    },
}

NoticeView.propTypes = propTypes
NoticeView.defaultProps = defaultProps

export default NoticeView

