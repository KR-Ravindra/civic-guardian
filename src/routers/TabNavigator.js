import React,{useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { Keyboard, TouchableOpacity,View,SafeAreaView } from 'react-native';


import HomeScreen from '../components/home'
import ProfileScreen from '../components/profile'
import SearchScreen from '../components/search'



const TabBar = ({ state, navigation }) => {

    const [visible, setVisible] = useState(true);
  
    // const keyboardWillShow = () => {
    //     setVisible(false);
    // };
  
    // const keyboardWillHide = () => {
    //     setVisible(true);
    // };
  
    // useEffect(() => {
    //     const keyboardWillShowSub = Keyboard.addListener(Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }), keyboardWillShow);
    //     const keyboardWillHideSub = Keyboard.addListener(Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }), keyboardWillHide);
    //     return () => {
    //         keyboardWillShowSub.remove();
    //         keyboardWillHideSub.remove();
    //     }
    // }, [])
  
    return (
  
      <View style={{ 
        flexDirection: 'row', 
        backgroundColor: '#000', 
        maxHeight: visible ? 64 : 0, 
        borderTopWidth: 0.5, 
        borderTopColor: 'black' }}
      >
          { state.routes.map((route, index) => {
              const label = route.name;
              const isFocused = state.index === index;
  
              const onPress = () => {
                  if(!isFocused){
                      navigation.navigate(route.name);
                  }
              };
  
                  return (
                      <TouchableOpacity
                          onPress={onPress}
                          activeOpacity={1}
                          key={label}
                          style={[{ 
                            minHeight: 48, 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginBottom: 2 
                          }]}
                      >
                          {label === 'Home' && <Ionicons name="home" size={24} color="white" />}
                          {label === 'Search' && <Entypo name="magnifying-glass" size={24} color="white" />}
                          {label === 'Profile' && <FontAwesome name="user" size={24} color="white" />}
                      </TouchableOpacity>
                  ); 
          })}   
      </View>
    );
  }

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: '#fff' }}>
            <Tab.Navigator
                initialRouteName='Profile'
                header={null}
                headerMode='none'
                tabBar={props => <TabBar {...props} />}
                tabBarOptions= {{ 
                    keyboardHidesTabBar: true 
                }}
                backBehavior={'none'}
            >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
            />
            <Tab.Screen
                name='Search'
                component={SearchScreen}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
            />
            </Tab.Navigator>
        </SafeAreaView>
    )
}
