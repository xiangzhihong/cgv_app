import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native'
import PropTypes from 'prop-types'

const {width} = Dimensions.get('window')

const propTypes = {
    title: PropTypes.string,
    baseUrl: PropTypes.string,
    imgUrl: PropTypes.string,
    schedule: PropTypes.string,
    movieFormat: PropTypes.string,
    language: PropTypes.string,
    cinema: PropTypes.string,
    screen: PropTypes.string,
    seats: PropTypes.array,
    totalCount: PropTypes.number,
    totalAmount: PropTypes.number
}

const defaultProps = {}

const TicketSummaryItem = ({
                               title,
                               baseUrl,
                               imgUrl,
                               schedule,
                               movieFormat,
                               language,
                               cinema,
                               screen,
                               seats,
                               totalCount,
                               totalAmount,
                               ...props
                           }) => {

    useEffect(() => {

    }, [])

    return (
        <View>
            <View style={styles.detailMain}>
                <Image
                    style={styles.detailImage}
                    resizeMode="contain"
                    source={{uri: `${baseUrl}${imgUrl}`}}
                />
                {totalCount ?
                    <View style={styles.detailRight}>
                        <Text style={styles.detailTitle} numberOfLines={1} type="heading" bold>{title}</Text>
                        <Text style={styles.detailTime} numberOfLines={1}
                              type="bodyheading">{schedule} {language}/{movieFormat}</Text>
                        <Text style={styles.detailLocal} numberOfLines={1} type="bodyheading">{cinema} {screen}</Text>
                        <View style={styles.detailSeat}>
                            {seats && seats.map((item, index) => (
                                <Text key={index} style={styles.detailSeatText} type="bodyheading">
                                    {item.seatNm}<Text key={index} style={styles.detailSeatPrice}
                                                       type="bodyheading">(￥{item.saleAmt})</Text>
                                </Text>
                            ))}
                        </View>
                    </View>
                    :
                    <View style={styles.detailRight}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                            <Text style={styles.detailTitle} numberOfLines={1} type="heading" bold>{title}</Text>
                            <Text style={[styles.detailTime2, {marginLeft: 8, marginTop: 7}]} numberOfLines={1}
                                  type="bodyheading">{language}/{movieFormat}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={styles.detailTime2} numberOfLines={1} type="bodyheading">时间：</Text>
                            <Text style={[styles.detailTime2, {color: '#181818'}]} numberOfLines={1}
                                  type="bodyheading">{schedule}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={styles.detailTime2} numberOfLines={1} type="bodyheading">影院：</Text>
                            <Text style={[styles.detailTime2, {color: '#181818'}]} numberOfLines={1}
                                  type="bodyheading">{cinema}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Text style={styles.detailTime2} numberOfLines={1} type="bodyheading">影厅：</Text>
                            <Text style={[styles.detailTime2, {color: '#181818'}]} numberOfLines={1}
                                  type="bodyheading">{screen}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Text style={styles.detailTime2} type="bodyheading">座位：</Text>
                            <View style={[styles.detailSeat, styles.detailTime2, {width: '93%'}]}>
                                {seats && seats.map((item, index) => (
                                    <Text key={index} style={[{color: '#181818', marginRight: 15}]} type="bodyheading">
                                        {item.seatNm}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                }
            </View>
            {
                totalCount ?
                    <View style={styles.detailBottom}>
                        <View style={styles.detailLine}/>
                        <Text style={styles.detailBottomText1} numberOfLines={1}
                              type="bodyheading">共{totalCount}张</Text>
                        <Text style={styles.detailBottomText2} numberOfLines={1} type="bodyheading">总票价: ￥</Text>
                        <Text style={styles.detailBottomText3} numberOfLines={1} type="heading"
                              bold>{totalAmount}</Text>
                    </View>
                    : null
            }

        </View>
    )
}


TicketSummaryItem.propTypes = propTypes

TicketSummaryItem.defaultProps = defaultProps

const styles = StyleSheet.create({
    detailMain: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
    },
    detailImage: {
        width: 100,
        height: 143,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 7
    },
    detailRight: {
        width: width - 154,
    },
    detailTitle: {
        color: '#222',
    },
    detailTime: {
        color: '#777',
        marginTop: 12,
        marginBottom: 4,
    },
    detailTime2: {
        color: '#777',
        marginTop: 4,
        marginBottom: 4,
    },
    detailLocal: {
        color: '#777',
        marginBottom: 12,
    },
    detailSeat: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
    },
    detailSeatText: {
        color: '#777',
        marginBottom: 4,
        marginRight: 8,
    },
    detailSeatPrice: {
        color: '#F1A23D',
    },
    detailLine: {
        width: width - 22,
        height: 2,
        backgroundColor: '#EFEFEF',
        position: 'absolute',
        top: -1,
        left: -10,
    },
    detailBottom: {
        height: 44,
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 12
    },
    detailBottomText1: {
        lineHeight: 44,
        color: '#222',
        width: 45,
        textAlign: 'left',
    },
    detailBottomText2: {
        lineHeight: 44,
        color: '#222',
    },
    detailBottomText3: {
        lineHeight: 42,
        color: '#222',
    },

})

export default TicketSummaryItem
