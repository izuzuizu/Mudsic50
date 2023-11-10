import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { BottomTab } from './Navigator';

const PersonCharts = ({ titulo, variabilidad, valorInicial, valorFinal }) => {
    const puntoDeseado = variabilidad * 100;
    return (
    <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        <View style={styles.bar}>
            <View style={[styles.stable, { width: puntoDeseado + '%' }]} />
            <View style={[styles.variable, { width: (100 - puntoDeseado) + '%' }]} />
        </View>
        <View style={styles.valoresCont}>
            <Text style={styles.valores}>{valorInicial}</Text>
            <Text style={styles.valores}>{valorFinal}</Text>
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
        height: 125,
    },
    title:{
        padding: 5,
        textTransform: 'capitalize',
        fontSize:  12,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 10,
        color: '#f1f1f1',
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
    },
    stable: {
        backgroundColor: '#f1f1f1',
        height: 10,
        borderTopLeftRadius: 25,      // Para el borde superior izquierdo
        borderBottomLeftRadius: 25, 
    },
    variable: {
        backgroundColor: '#404040',
        height: 10,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },
    valoresCont:{
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',        
    },
    valores:{
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'lowercase',
        color: '#f1f1f1',
    }
});


export default PersonCharts