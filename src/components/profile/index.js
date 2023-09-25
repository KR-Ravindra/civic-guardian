import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';


export default class ProfileScreen extends Component{
render(){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Profile</Text>
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
});