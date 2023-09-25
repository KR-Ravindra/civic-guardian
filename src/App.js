import { Provider } from 'react-redux';//state available throughout the app
import { PersistGate } from 'redux-persist/integration/react';//reloading the data when the application is reopened.

import React, {Fragment, Component} from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import configureStore from './redux/store/configureStore';
import Colors from './style/colors';
import RootNav from './routers/rootNav';


const {store, persistor} = configureStore();

export default class App extends Component {
  render() {
    console.log('Hello')
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Fragment>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={Colors.black}
            />
            <SafeAreaView
              style={{flex: 1}}
              forceInset={{bottom: 'never', top: 'never'}}>  
               <RootNav
                // ref={navigatorRef => {
                //   NavigationService.setTopLevelNavigator(navigatorRef);
                // }}
              /> 
              {/* <View style={styles.container}>
                 <Text>Open up App.js to start working on your app!</Text>
                <StatusBar style="auto" />
               </View> */}
            </SafeAreaView>
          </Fragment>
        </PersistGate>
      </Provider>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
