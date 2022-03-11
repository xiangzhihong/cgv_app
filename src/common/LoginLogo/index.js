import React from 'react'
import {Text, View, StyleSheet, Image} from 'react-native'

const LoginLogo = () => {
    return (
        <View style={styles.logoLayer}>
            <Image
                style={styles.logo}
                source={require('../../assets/images/login/loginLogo.png')}
            />
            <Text style={styles.welcome}>欢迎登录</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoLayer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    logo: {
        height: 50,
        width: 50
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default LoginLogo
