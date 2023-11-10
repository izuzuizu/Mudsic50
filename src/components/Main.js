import {React, useRef, useEffect} from 'react'
import Constants from 'expo-constants'
import Item from './Item'
import Row from './Row'
import Reproductor from '../screens/Player'
import Profile from '../screens/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlayerMinimized from './playerMinimized'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Rnd } from 'react-rnd';
import DraggableComponent from '../components/moving'
import { StyleSheet, Text, View, Image, Alert, TouchableNativeFeedback, FlatList, TouchableNativeFeedbackBase, ScrollView } from 'react-native'
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { BottomTab } from './Navigator';
import HomeScreen from '../screens/HomeScreen'
import { Animated, PanResponder, Dimensions } from 'react-native';
// import { Animated, PanResponder, Dimensions, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import ListaUsuarios from '../backend/verUsuarios';
import stacks from '../backend/stack'
import Form from '../backend/Form';
import Login from '../backend/Login';

const Stack = createStackNavigator()




const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const placeholderData = [1, 2, 3, 4, 5, 6, 7, 8];

const Main = () => {
  // useEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp(); // Cierra la aplicación
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, []);
  const MyTheme = {
    ...DarkTheme,
    color:{
      ...DarkTheme.colors,
      primary: '#f1f1f1',
      card: '#141414',
      text: '#878787',
      border: '#404040',
    }
  }
  
    return(
        <View style={{flex:1, backgroundColor: '#404040'}}>
          
          {/* <Stack.Navigator>
              <Stack.Screen 
              name="login"
              component={Login}
              options={{title: "iniciar sesion..."}}/>
              <Stack.Screen
              name="main"
              options={{title: "iniciar sesion..."}}>
              </Stack.Screen>
          </Stack.Navigator> */}
                <View style={{flex: 1}}>
                  <NavigationContainer style={styles.container} theme={MyTheme}>
                    {/* <PlayerMinimized/> */}
                    {/* <Stack.Navigator initialRouteName={Login}> */}
                    <Stack.Navigator initialRouteName={"Navegador"}>
                      <Stack.Screen name="Login" component={Login}
                      options={{ gestureEnabled: false, headerShown: false }} />
                      <Stack.Screen name="Register" component={Form}
                      options={{ gestureEnabled: false, headerShown: false }} />
                      <Stack.Screen name='Navegador' component={BottomTab} 
                      options={{ gestureEnabled: false, headerShown: false }} />
                    </Stack.Navigator>
                  </NavigationContainer>
                </View>
        </View>
    )
} 
export default Main

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
});