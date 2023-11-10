import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import Search from '../screens/Search';


const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
    return(
        <View style={HeaderStyle.container}>
            <Text style={HeaderStyle.text}>MUDSIC</Text>
            <TouchableOpacity 
                style={HeaderStyle.icon} 
                onPress={() => setSearchVisible(true)}
            >
                <FontAwesome style={HeaderStyle.icon} name="search"/>
            </TouchableOpacity>
            {searchVisible ? <Search/> : null}
        </View>
    )
}

const HeaderStyle = StyleSheet.create({
    container:{
        width: '100%',        
        backgroundColor: '#141414',
        position: 'static',
        flex: 0.05,        
        alignItems: 'flex-start',
        textAlign: 'center',        
        justifyContent: 'space-between', 
        paddingTop: 10,
        paddingHorizontal: 30,
        flexDirection: 'row',       
        marginTop: Constants.statusBarHeight,
        elevation: 5, 
        borderBottomWidth: 2,
        borderColor: '#666666',
    },
    icon:{
        fontSize: 20,
        fontWeight: '100',
        color: '#e8e8e8',        
    },
    text:{
        fontSize: 26,                
        color: '#e8e8e8',
        marginTop: -7
    }
})

export default Header;