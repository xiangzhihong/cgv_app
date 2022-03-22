import React, {useEffect, useRef, useState} from 'react'
import {FlatList, SectionList, StyleSheet, View} from 'react-native'
import ShoppingCartBar from './components/ShoppingCartBar'
import GoodItem from '../../common/GoodItem/GoodItem'
import Menu from './components/Menu'
import {tools} from '../../utils'
import apiRequest from "../../api";
import {goBack} from "../../utils/rootNavigation";

const GoodListScreen = ({navigation: {navigate}}) => {
    let currentCategoryName
    const sectionListEle = useRef(null)
    const [goods, setGoods] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        getGoodCategory()
    }, [])

    async function getGoodCategory() {
        let url = '/product/good/list-all'
        let param = {
            facilityCd: 188,
            prodCatalogCd: 1201,
            showInSelect: '1',
        };
        const data = await apiRequest.post(url,param)
        setGoods(
            (data.content).map(({goodList, ...res}, index) => ({
                ...res,
                isHot: index === 0,
                data: goodList,
            })),
        )
    }

    const select = (index) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index)
            sectionListEle.current.scrollToLocation({
                animated: false,
                itemIndex: 0,
                sectionIndex: index,
                viewPosition: 0,
            })
        }
    }

    const onViewableItemsChanged = (info) => {
        const fisrtViewableItem = info.viewableItems[0]
        if (fisrtViewableItem) {
            const {categoryName} = fisrtViewableItem.item
            if (categoryName !== currentCategoryName) {
                const index = goods.findIndex((c) => c.categoryName === categoryName)
                setSelectedIndex(index)
                currentCategoryName = categoryName
            }
        }
    }

    const createGoodOrder = async () => {
        tools.alert('购物车不能为空！', '', [
            {
                text: '确定',
                onPress: () => {
                    goBack()
                },
            },
        ])
    }


    function renderShopCart() {
        return (<ShoppingCartBar
            style={{height:60}}
            amount={0}
            num={0}
            onPressLeft={() => navigate('MyModal', {screen: 'ShopingCartScreen'})}
            onPressRight={() => {
                createGoodOrder()
            }}
        />);
    }

    function renderLeftList() {
        return (<View style={styles.leftList}>
            <FlatList
                data={goods}
                renderItem={({item, index}) => (
                    <Menu
                        item={item}
                        isHot={index === 0}
                        isSelected={index === selectedIndex}
                        select={() => select(index)}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>);
    }

    function renderRightList() {
        return (<SectionList
            style={styles.rightList}
            ref={sectionListEle}
            onScrollToIndexFailed={() => ({
                index: selectedIndex,
            })}
            sections={goods}
            renderItem={({item}) => (
                <GoodItem  item={item}/>
            )}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewableItemsChanged}
        />);
    }

    return goods.length>0 && (
        <View style={styles.contain}>
            <View style={styles.body}>
                {renderLeftList()}
                {renderRightList()}
            </View>
            {renderShopCart()}
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        flexDirection:'column',
        flex:1
    },
    body: {
        flex: 1,
        flexDirection: 'row',
    },
    leftList: {
        width: 72,
        backgroundColor: '#FBF8FB',
    },
    rightList: {
        flex: 1,
    },
    title: {
        backgroundColor: '#fff',
        padding: 5,
    },
})

export default GoodListScreen;
