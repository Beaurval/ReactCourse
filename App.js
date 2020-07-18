import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Navigation from './Navigation/Navigation'
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <NavigationContainer>

            <Navigation/>

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
