import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import Card from '../../../../common/Card/Card'
import SectionHeader from '../../../../common/SectionHeader'
import {ShopProductItem} from '../../components'
import {navigate} from '../../../../utils'

const ShopContainer = ({items, addToCart: _addToCart}) => {

    return (
        <Card type="clear" style={styles.container}>
            {items?.length > 0 ? <SectionHeader title="热销商品" isRenderRight onClick={() => navigate('GoodListScreen')}/> : null}
            <FlatList
                data={items}
                horizontal
                style={styles.cardList}
                renderItem={({item}) => {
                    return <ShopProductItem navigation item={item} add={() => {
                        _addToCart(item)
                    }} type='movie' goAdd={(i) => {

                    }}/>
                }}
                keyExtractor={item => `key_${item.id}`}
                showsHorizontalScrollIndicator={false}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        padding: 12
    },
    cardList: {
        flexDirection: 'row',
    },
})

export default ShopContainer;
