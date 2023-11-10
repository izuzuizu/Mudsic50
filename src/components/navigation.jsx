import React from "react";
import { useState } from "react";

//Navigators
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Icons librarie
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Bottom screens
import Main from "./Main";



const Stack = createNativeStackNavigator();

const Stacks = () =>{
    return(
        <Stack.Navigator
        
            screenOptions={{
                initialRouteName: 'Main',
                headerStyle:{
                    backgroundColor:'#2F2F2F',
                }
            }}>

            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    headerShown:false,
                }}
            />

        </Stack.Navigator>
    )
}


export default Navigations = () =>{
    return(
        <NavigationContainer>
        </NavigationContainer>
    )
}