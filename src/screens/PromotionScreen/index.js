import React, {useState, useEffect} from 'react'
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList, View,
} from 'react-native'
import Empty from '../../common/Empty'
import Header from '../../common/Header/Header'
import FilterBar from '../../common/FilterBar'
import Holder from '../../common/Holder'
import ButtonListFooter from '../../common/ButtonListFooter'
import PromotionBanner from './components/PromotionBanner/PromotionBanner'
import apiRequest from "../../api";

const LeftView = ({cinemaName = '上海大宁电影城', onHeaderLeftPress}) => {
    return (
        <TouchableOpacity style={styles.leftContainer} onPress={() => onHeaderLeftPress()}>
            <Image source={require('../../assets/images/promotion/address.png')} style={styles.addressImg}/>
            <Text numberOfLines={1} style={styles.name}>{cinemaName}</Text>
        </TouchableOpacity>
    )
}

const PromotionScreen = ({navigation: {navigate}, position: _position, route, thatCd}) => {
    const [categories, setCategories] = useState([]);
    const [selectedAndGroupCd, setSelectedAndGroupCd] = useState('');
    const [promotionList, setPromotionList] = useState([]);
    const categoryName = categories.find(c => c.andGroupCd === selectedAndGroupCd)?.andGroupName || ''

    useEffect(() => {
        getPromotionData();
        getCategories();
    }, [])

    async function getPromotionData() {
        let url = '/product/api/product/verify/promos';
        let param = {
            andGroupCd: "",
            thatCd: 1996,
            chnlNo: "05",
            channel: "APP"
        };
        const data = await apiRequest.post(url, param);
        setPromotionList(data || []);
    }

    async function getCategories() {
        let url = '/product/api/product/promo/categories';
        const data = await apiRequest.get(url);
        setCategories(data || []);
    }

    const changeCategory = values => {
        const cd = categories.find(c => c.andGroupName === values[0])?.andGroupCd || ''
        setSelectedAndGroupCd(cd)
    }

    const showPicker = () => {
        navigate('SelectorScreen', {
            values: categories.map(c => c.andGroupName),
            defaultValues: [categoryName],
            onConfirm: changeCategory
        })
    }

    const onHeaderLeftPress = () => {
        navigate('CitySelectScreen');
    }

    const gotoDetail = async (_item) => {
        try {
            let params = {
                source: 'ActivePage',
                item: _item,
                thatCd,
                navigate,
                selectId: selectedAndGroupCd,
                detailData: promotionList[0],
                type: categoryName === '积分活动' ? '积分' : '',
            }
            navigate('PromotionDetailScreen', params)
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({item}) => (
        <PromotionBanner
            item={item}
            isExpired={false}
            onItemClick={() => gotoDetail(item)}/>
    )

    return (
        <View>
            <Header title="活动列表" renderLeftView={() => <LeftView onHeaderLeftPress={onHeaderLeftPress}/>}/>
            <FilterBar title={categoryName} onPress={showPicker}/>
            <FlatList
                data={promotionList}
                onRefresh={() => getPromotionData()}
                refreshing={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <Holder height={10}/>}
                ListFooterComponent={() => <ButtonListFooter transparent style={styles.bottomBtn} content="查看已结束活动"/>}
                ListEmptyComponent={
                    <Empty title="没有活动列表" style={{marginTop: 100}}/>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    leftContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    addressImg: {
        height: 18,
        width: 18,
    },
    name: {
        color: '#222',
        fontSize: 15,
        width: 110
    },
    bottomBtn: {
        marginBottom: 60,
    },
})


export default PromotionScreen;
