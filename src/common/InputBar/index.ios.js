import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Animated,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import {tools} from '../../utils'

const InputBar = (
    {
        buttonText = '发表',
        placeholder = '说点儿什么~',
        value,
        onChangeText,
        onSubmit = () => {
        },
        animatedValue,
        keyboardHeight,
        assignRef,
        loading,
        ...props
    },
) => {

    console.log(animatedValue)

    return (
        <Animated.View style={[
            styles.container, {paddingBottom: tools.isIPhoneX() ? 28 : 0},
            {
                transform: [{
                    translateY: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, (tools.isIPhoneX() ? 28 : 0) - keyboardHeight],
                    }),
                }]
            },
        ]}>
            <View style={styles.box}>
                <View style={styles.inputContainer}>
                    <TextInput
                        ref={component => assignRef && assignRef(component)}
                        onSubmitEditing={onSubmit}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        underlineColorAndroid="transparent"
                        style={{padding: 0, flex: 1}}
                        {...props}
                    />
                </View>
                <TouchableOpacity disabled={loading} activeOpacity={0.7} onPress={onSubmit}>
                    <Text type="subheading" style={{color: '#999'}}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )

}

const styles = StyleSheet.create({
    container: {
        borderTopColor: '#E5E5E5',
        borderTopWidth: 0.7,
        backgroundColor: '#FAFAFA',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 49,
        paddingHorizontal: 15,
        paddingVertical: 6,
    },
    inputContainer: {
        flex: 1,
        padding: 6,
        marginRight: 10,
        borderRadius: 4,
        borderWidth: 0.7,
        borderColor: '#E5E5E5',
        backgroundColor: '#fff',
    },
})

export default InputBar
