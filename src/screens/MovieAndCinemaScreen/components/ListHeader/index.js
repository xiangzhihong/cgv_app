import React from 'react'
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
import TipCard from '../../../../common/TipCard'
import CircleClick from '../../../../common/CircleClick'

const ListHeader = (
    {
        list = [
            {
                'scnDy': '20200728',
                'scnDyDay': '28',
                'activity': '0',
                'scnDyName': '今天',
            },
            {
                'scnDy': '20200731',
                'scnDyDay': '31',
                'activity': '0',
                'scnDyName': '周五',
            },
            {
                'scnDy': '20200801',
                'scnDyDay': '01',
                'activity': '0',
                'scnDyName': '周六',
            },
        ],
        onPress = () => {
        },
        isDiscount = false,
        activeIndex,
        ...props
    },
) => {
    return (
        <View style={[styles.container, {backgroundColor: '#fff', borderBottomColor: '#e5e5e5'}]}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {
                    list.map((item, index) => (
                        <View style={{marginRight: 36, flexDirection: 'row'}} key={index.toString()}>
                            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => {
                                onPress(index)
                            }}>
                                <Text type="subheading" style={{color: '#777', marginBottom: 6}}>{item.scnDyName}</Text>
                                <CircleClick text={item.scnDyDay} isActive={activeIndex === index} {...props} />
                            </TouchableOpacity>
                            {
                                item.activity === '1' ? <TipCard/>
                                    : null
                            }
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingLeft: 15,
        borderBottomWidth: 0.6,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    discount: {
        flexDirection: 'row',
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2,
        marginTop: 2,
    }
})

export default ListHeader
