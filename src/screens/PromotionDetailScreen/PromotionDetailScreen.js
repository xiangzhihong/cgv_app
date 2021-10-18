import React, {useEffect, useState} from 'react'
import {View, ScrollView, Image, Dimensions} from 'react-native'
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

export default PromotionDetailScreen;

