import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import HomeContainer from './components/HomeContainer';
import MovieScreen from './MovieScreen';
import CinemaScreen from './CinemaScreen';
import {navigate} from "../../utils";

const HeaderLeft = props => {
    const {currentCinema} = props;
    const {addName = '上海大宁电影城'} = currentCinema;
    const address = require('../../assets/images/home/address.png');
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.headerLeft} onPress={() => {
            navigate("CitySelectScreen")
        }
        }>
            <Image source={address} style={{width: 20, height: 20}}/>
            <Text numberOfLines={1} style={{width: '80%'}}>
                {addName}
            </Text>
        </TouchableOpacity>
    );
};

export default function MovieHeader() {
    const selectedCinema = '上海大宁电影城';
    return (
        <View style={{flex: 1}}>
            <HomeContainer
                renderHeaderLeft={() => <HeaderLeft currentCinema={selectedCinema}/>}
                FirstRoute={MovieScreen}
                SecondRoute={CinemaScreen}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: theme => ({
        flex: 1,
        backgroundColor: theme.white,
    }),
    scene: {
        flex: 1,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        flex: 1,
    },
    headerRight: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
        flex: 1,
    },
});
