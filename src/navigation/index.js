import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainStackScreen from './MainStackScreen';
import ModalScreen from './ModalScreen'
import ExceptionScreen from '../screens/ExceptionScreen'
import {navigationRef} from '../utils';
import AlertScreen from "./AlertScreen";
import {StatusBar} from "react-native";

const RootStack = createStackNavigator();

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const Navigator = () => {
    return (
        <>
            {/*<StatusBar*/}
            {/*    StatusBarAnimation="fade"*/}
            {/*    backgroundColor="#fff"*/}
            {/*    barStyle={'light-content'}*/}
            {/*/>*/}
            <NavigationContainer ref={navigationRef}>
                <RootStack.Navigator mode="modal" initialRouteName="Main">
                    <RootStack.Screen
                        name="Main"
                        component={MainStackScreen}
                        options={{headerShown: false}}
                    />
                    <RootStack.Screen
                        name="MyModal"
                        component={ModalScreen}
                        options={{
                            headerShown: false,
                            cardStyle: {
                                backgroundColor: 'transparent',
                                shadowColor: 'transparent'
                            },
                            cardStyleInterpolator: ({current: {progress}}) => {
                                return {
                                    overlayStyle: {
                                        opacity: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 0.5],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                }
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="Alert"
                        component={AlertScreen}
                        options={{
                            animationEnabled: true,
                            cardOverlayEnabled: true,
                            gestureEnabled: false,
                            header: () => null,
                            cardStyleInterpolator: ({current: {progress}}) => {
                                return {
                                    cardStyle: {
                                        opacity: progress.interpolate({
                                            inputRange: [0, 0.5, 0.9, 1],
                                            outputRange: [0, 0.25, 0.9, 1],
                                        }),
                                        transform: [
                                            {
                                                scale: progress.interpolate({
                                                    inputRange: [0, 0.5, 0.9, 1],
                                                    outputRange: [0, 0.25, 1.1, 1],
                                                }),
                                            },
                                        ],
                                    },
                                    overlayStyle: {
                                        opacity: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 0.5],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                }
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="ExceptionScreen"
                        component={ExceptionScreen}
                        options={{title: 'CVG影城'}}/>
                </RootStack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default Navigator;
