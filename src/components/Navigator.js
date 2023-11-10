import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MoodsScreen from '../screens/MoodsScreen';
import Search from '../screens/Search'
import { Animated, PanResponder, Dimensions } from 'react-native';
import ListaUsuarios from '../backend/verUsuarios';
import PlayerMinimized from './playerMinimized'
import Reproductor from '../screens/Player'
import stacks from '../backend/stack'
// import Form from './backend/Form';
import Reactions from './Reactions';
import Login from '../backend/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const BottomTab = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [showPositiveEmojis, setShowPositiveEmojis] = useState(true); // Estado para alternar entre emojis positivos y negativos

    const emojisPositive = ['👍', '😍', '👍', '😈', '🤣', '😄', '🥳', '😴', '👹', '🚀'];
    const emojisNegative = ['👎', '🤮', '💔', '😭', '😡', '😭'];

    const emojisToShow = showPositiveEmojis ? emojisPositive : emojisNegative;

    const toggleLikeDislike = () => {
        setShowPositiveEmojis(!showPositiveEmojis);
    };
    const pan = useRef(new Animated.ValueXY()).current;
    let lastY
    let movido
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (movido) {
          console.log(pan.getLayout())
          pan.y.setValue(lastY)
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(event, gestureState);
          movido=false
        }
          // console.log(pan.getLayout())
          // pan.y.setValue(lastY)
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(event, gestureState);
        // console.log(gestureState.dx)
      },
      onPanResponderRelease: () => {
        Animated.spring(pan.y, {
          toValue: pan.y._value < (windowHeight / 300) ? (windowHeight*-1.012) : (windowHeight*-0.0002950),
          useNativeDriver: false,
        }).start(() => {
          movido = true
          lastY = pan.y._value
          console.log(lastY)
          // Esto se ejecuta después de la animación
          // pan.y.setValue(pan.getLayout);  // Restablece pan.y a 0
          // console.log(pan.y._value)
        });
      },
    });
    return(
        <>
                <Tab.Navigator style={TabStyles.tabNavigator} screenOptions={{
                    headerShown: false,
                }}                
                sceneContainerStyle={{
                    backgroundColor: '#404040', // Fondo del contenido de la pantalla
                }}
                >
                    <Tab.Screen
                        style={TabStyles.tabScreen}
                        name="Home"
                        component={HomeScreen}
                        options={{
                        tabBarLabel: '', // O bien, tabBarLabel: undefined
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome style={TabStyles.icon} name="home" color={color} size={size} />
                        ),
                        }}
                    ></Tab.Screen>
                    <Tab.Screen style={TabStyles.tabScreen}
                        name="Favs"
                        component={FavoritesScreen}
                        options={{
                            tabBarLabel: '',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome style={TabStyles.icon} name="heart" color={color} size={size} />
                            ),
                        }}
                    ></Tab.Screen>
                    <Tab.Screen style={TabStyles.tabScreen}
                    name="Search"
                    component={Search}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome style={TabStyles.icon} name="search" color={color} size={size} />
                        ),
                    }}
                ></Tab.Screen>           
                    <Tab.Screen style={TabStyles.tabScreen}
                        name="Mood"
                        component={MoodsScreen}
                        options={{
                            tabBarLabel: '',
                            tabBarIcon: ({ color, size }) => (
                                <TouchableOpacity style={TabStyles.icon} onPress={() => setModalVisible(true)}>
                                    <FontAwesome name="smile-o" style={TabStyles.icon} color={color} size={size} />
                                        <Reactions margBot={'8.3%'} margLeft={'38%'}
                                        modalVisible={modalVisible}
                                        setModalVisible={setModalVisible}
                                        showPositiveEmojis={showPositiveEmojis}
                                        toggleLikeDislike={toggleLikeDislike}
                                        emojisToShow={emojisToShow}
                                        />
                                </TouchableOpacity>

                            ),
                        }}
                    ></Tab.Screen>
                    <Tab.Screen style={TabStyles.tabScreen}
                            name="Profile"
                            component={ProfileScreen}
                            options={{
                                tabBarLabel: '',
                                tabBarIcon: ({ color, size }) => (
                                    <FontAwesome style={TabStyles.icon} name="user" color={color} size={size} />
                                ),
                            }}
                        ></Tab.Screen>
                        {/* <Tab.Screen style={TabStyles.tabScreen}
                                name="Users"
                                component={ListaUsuarios}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: ({ color, size }) => (
                                        <FontAwesome style={TabStyles.icon} name="users" color={color} size={size} />
                                    ),
                                }}
                            ></Tab.Screen> */}
                    </Tab.Navigator>
                    
                <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), { flex: 0.0015, width: '100%', height: '100000%'}]}>
                    <PlayerMinimized></PlayerMinimized>
                    <View style={{height:'1000%', position:'absolute', height: (windowHeight + (windowHeight*0.1)), width: windowWidth }}>
                        <Reproductor></Reproductor>
                    </View>
                </Animated.View>
        </>

    )
}
const TabStyles = StyleSheet.create({
    tabNavigator:{
        position: 'fixed', 
        bottom: 0,
        flexDirection: 'row', // Alinea los iconos horizontalmente
        justifyContent: 'space-evenly', // Espacio entre los iconos
        alignItems: 'center', // Alinea los iconos verticalmente
        zIndex: 100000000,
    },
    tabScreen:{
        width: 50,
        height: 50,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',                
        textAlign: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 150
    },
    icon:{
        fontSize: 20,
        marginTop: 'auto',
        zIndex: 1000000000,        
    }

})
