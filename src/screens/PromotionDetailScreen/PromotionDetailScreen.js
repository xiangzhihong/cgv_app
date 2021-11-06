import React, {useEffect, useState} from 'react'
import {StyleSheet,View, ScrollView, Image, Dimensions} from 'react-native'
import httpConfig from "../../api/httpConfig";

const {width, height} = Dimensions.get('window')

const PromotionDetailScreen = ({route}) => {
    const {item = []} = route.params || {};
    const [imgH, setImgH] = useState(height);
    const [promoImg, setPromoImg] = useState('');

    useEffect(() => {
        setPromoImg(httpConfig.mediaUrl + item.promoPosterImg);
    }, []);

    function setSize(imgItem) {
        let showH;
        Image.getSize(imgItem, (w, h) => {
            showH = Math.floor(h / (w / width));
            setImgH(showH);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Image
                    onLoadStart={() => {
                        setSize(promoImg);
                    }}
                    style={{width: width, height: imgH}}
                    source={{uri: promoImg}}/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
})

export default PromotionDetailScreen;

