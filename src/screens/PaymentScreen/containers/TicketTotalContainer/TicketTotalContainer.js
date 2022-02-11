import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from '../../../../common/Card/Card';
import SectionHeader from '../../../../common/SectionHeader';

const TicketTotalContainer = ({data}) => {
    return (
        <Card type="clear" style={styles.container}>
            <View>
                <SectionHeader title="票价小计："   isRenderButton={false} rightText={`¥${data.cinema.money.price}`}/>
                <View style={styles.discountLine} >
                    <Text  style={styles.discountName}>已优惠</Text>
                    <Text style={styles.discountAmount}>-￥0</Text>
                </View>
            </View>
        </Card>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginHorizontal: 12,
        padding: 12
    },
    sectionTitle: {
        color: '#222222'
    },
    sectionTitleButton: {
        color: '#777777'
    },
    discountLine: {
        height: 29,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 18
    },
    discountName: {
        width: 180,
        height: 29,
        lineHeight: 29,
        color: '#777',
    },
    discountAmount: {
        width: 50,
        height: 29,
        lineHeight: 29,
        textAlign: 'right',
        color: '#F1A23D',
        marginRight: 5,
    },
});

export default TicketTotalContainer;
