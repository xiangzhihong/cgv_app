import React, {useState, useEffect} from 'react'
import {Text, Modal, StyleSheet, View, TouchableOpacity, FlatList, ActivityIndicator, Image} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import httpConfig from "../../../api/httpConfig";

const GoodCard = ({item, isSelected, select}) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={isSelected ? null : select}>
        {item.detailImageUrl ?
            <Image
                style={{width: '100%', height: 120}}
                source={{uri: httpConfig.mediaUrl + item.detailImageUrl}}/> : <Image
                source={require('../../../assets/images/shop/good1.png')}
                style={{width: '100%', height: 120}}
            />}
        <Text numberOfLines={1} style={styles.cardTitle}>{item.productName}</Text>
        <View style={styles.bottomLayer}>
            <View style={styles.scrapFactor}>
                {!!item.scrapFactor && (
                    <>
                        <Text style={{fontSize: 13, color: '#FC5869'}}>+ </Text>
                        <Text style={{fontSize: 10, color: '#FC5869', paddingTop: 2.5}}>¥</Text>
                        <Text style={{fontSize: 13, color: '#FC5869'}}>{item.scrapFactor}</Text>
                    </>
                )}
            </View>
            <AntDesign
                name={isSelected ? 'checkcircle' : 'checkcircleo'}
                size={18}
                color={isSelected ? '#F1A23D' : '#DDDDDD'}
            />
        </View>
    </TouchableOpacity>
)

const ModalChangeSelection = ({
                                  visible, isLoading, list = [], selectedItemId, close = () => {
    }, onChoice = () => {
    }
                              }) => {
    const [selectedId, setSeletedId] = useState(selectedItemId)

    useEffect(() => {
        setSeletedId(selectedItemId)
    }, [selectedItemId])

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={close}>
            <View style={styles.container} activeOpacity={1}>
                <View style={styles.box}>
                    <View style={styles.goodLayer}>
                        {isLoading ? <ActivityIndicator size="large" color={'#FC5869'}/> :
                            <FlatList
                                numColumns={2}
                                data={list}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item}) => <GoodCard item={item} isSelected={selectedId === item.id}
                                                                  select={() => setSeletedId(item.id)}/>}
                                keyExtractor={(item, index) => `key-${index}`}
                            />}
                    </View>
                    <View style={styles.btnLayer}>
                        <TouchableOpacity style={styles.btn} onPress={close}>
                            <Text style={styles.cancel}>取消</Text>
                        </TouchableOpacity>
                        <View style={styles.splite}/>
                        <TouchableOpacity style={styles.btn}
                                          onPress={() => onChoice(list.find(l => l.id === selectedId))}>
                            <Text style={styles.confirm}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(3,3,15,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 280,
        height: 460,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    goodLayer: {
        flex: 1,
        paddingVertical: 15,
        paddingLeft: 15,
        paddingRight: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLayer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5',
        height: 44,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel: {
        fontSize: 15,
        color: '#777',
    },
    confirm: {
        fontSize: 15,
        color: '#FC5869',
    },
    splite: {
        width: 1,
        backgroundColor: '#e5e5e5',
    },
    card: {
        width: 120,
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 3,
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
    },
    cardTitle: {
        marginVertical: 10,
    },
    bottomLayer: {
        paddingTop: 4,
        paddingBottom: 9,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
    },
    scrapFactor: {
        flex: 1,
        flexDirection: 'row'
    },
})

export default ModalChangeSelection
