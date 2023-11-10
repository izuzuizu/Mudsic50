import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { BottomTab } from './Navigator';

const PersonTastes = ({ titulo, data }) => {
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <View style={styles.cont}>
            {data.map((item, index) => (
            <View style={styles.item} key={index}>
                <Image source={{ uri: item.imageUri }} style={styles.image} />
                <View style={styles.textCont}>
                    <Text style={styles.titleItem}>{item.nombre}</Text>
                    <Text style={styles.descItem}>{item.descripcion}</Text>
                </View>
            </View>
            ))}
        </View>
    </View>
);
};


const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 100,
        marginBottom: 20,
    },
    title:{
        padding: 5,
        textTransform: 'capitalize',
        fontSize:  12,
        fontWeight: '500',
        marginTop: 20,
        color: '#f1f1f1',
        marginBottom: 10
    },
    cont:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 25,
        paddingHorizontal: 20
    },
    item:{
        width: 120,
        height: 80,
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    textCont:{
        width: 80,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center'
    },
    titleItem:{
        fontSize: 8,
        color: '#f1f1f1',
        textAlign: 'center',
        fontWeight: '700'
    },
    descItem:{
        fontSize: 7,
        textAlign: 'center'
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 500
    }
});


export default PersonTastes