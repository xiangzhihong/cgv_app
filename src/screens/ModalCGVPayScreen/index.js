import React from 'react'
import {Dimensions, Platform, StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native'
import {tools} from '../../utils'

const {width, height} = Dimensions.get('window')
const X_WIDTH = 375

const ModalCGVPay = ({route}) => {
    const {params = {}} = route
    const {addCardTitle} = params || {}

    const addCard = () => {
        tools.Toast.toast('添加星意卡', 1)
    }

    return (
        <View
            style={[
                styles.body,
                {
                    paddingTop: 10,
                    backgroundColor:  '#f8f8f8'
                },
            ]}>
            <TouchableOpacity
                onPress={() => addCard()}
                activeOpacity={0.9}
                style={styles.addBox}>
                <Image
                    resizeMode="stretch"
                    style={styles.addImg}
                    source={require('../../assets/images/friendCard/add.png')}
                />
                <Text style={styles.addText}>添加星意卡</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    addBox: {
        backgroundColor:  '#fff',
        flexDirection: 'row',
        marginVertical: 15,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderWidth: 2,
        width: width - 40,
        height: 44,
        borderRadius: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    addImg: {
        height: 12,
        width: 12,
        alignSelf: 'center',
        alignItems: 'center',
    },
    addText: {
        color: '#777',
        marginLeft: 3,
        fontSize: 13,
        alignSelf: 'center',
    },
    popupBodyTextTitle: {
        color: '#FC5869',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    button: {
        backgroundColor: '#FC5869',
        borderRadius: 20,
        width: width - 40,
        position: 'absolute',
        bottom: Platform.OS === 'ios' && width >= X_WIDTH ? -5 : 15,
        left: 20,
    },
    detailLine: {
        height: 2,
        backgroundColor: '#EFEFEF',
        left: -10,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderColor: '#EBEBEB',
        borderRadius: 4,
        width: '100%',
        paddingHorizontal: 10,
        borderWidth: 1,
        marginTop: 8,
        height: 40,
        textAlign: 'left',
    },
})

export default ModalCGVPay;
