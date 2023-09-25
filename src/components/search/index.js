import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';


export default class SearchScreen extends Component{
render(){
    return(
        <SafeAreaView style={styles.container}>
            <Text>Search</Text>
        </SafeAreaView>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});