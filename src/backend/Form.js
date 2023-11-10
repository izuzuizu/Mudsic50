import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { validateEmail, imagenDeGaleria } from './ayudas';
import { result, size } from 'lodash';
import { Icon, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native'

export default function Form() { 
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasenna, setContrasenna] = useState('');
    const [contrasennaverificacion, setContrasennaVerificacion] = useState('');
    const [Result, setImagen] = useState('');

    const SubirImagen = async() => {
        const Result = await imagenDeGaleria([1, 1])
        if(!Result.status) {
            return
        }
        return Result

    }

    const handleEnviarGet = () => {
        fetch('http://192.168.100.39:3001/api/usuarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Obtener el texto de la respuesta
                } else {
                    throw new Error('La solicitud no fue exitosa');
                }
            })
            .then(result => {
                console.log('Respuesta del servidor:', result);
                
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    };

    const handleEnviar = () => {
        if (!nombre || !correo || !contrasenna || !contrasennaverificacion) {
            Alert.alert('Campos Obligatorios', 'Todos los campos son obligatorios');
            return;}
        const datos = {
            nombre: nombre,
            correo: correo,
            contrasenna: contrasenna,
            imagen: Result
        };

        if(contrasenna != contrasennaverificacion) {
            Alert.alert('contraseña invalida','la contraseña no coincide');
            return;
        } 

        if(!validateEmail(correo)) {
            Alert.alert("email incorrecto","imgrese un email valido")
            return;
        }

        if(size(contrasenna) < 8) {
            Alert.alert("contraseña invalida", "ingrese mas de 8 caracteres")
            return;
        }
    
        fetch('http://192.168.100.39:3001/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('La solicitud no fue exitosa');
                }
            })
            .then(result => {
                console.log('Respuesta del servidor:', result);
                Alert.alert('Usuario agregado correctamente')
                //manejar la respuesta del servidor después de agregar registro.
                
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Error en la conexión al backend o la base de datos');
            });

        // fetch ('http://192.168.100.39:3001/api/subirImagen', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(Result)
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response.json();
        //     } else {
        //         throw new Error('La solicitud no fue exitosa');
        //     }
        // })
        // .then(result => {
        //     console.log('Respuesta del servidor:', result);
        //     Alert.alert('foto subida')
        //     //manejar la respuesta del servidor después de agregar registro.
            
        // })
        // .catch(error => {
        //     console.error('Error en la solicitud:', error);
        //     alert('Error en la conexión al backend o la base de datos');
        // });
            
    };

    const navigation = useNavigation()

    return (
        <>
        <ScrollView 
        centerContent
        > 
            <View>
                <KeyboardAwareScrollView>
                <Text>Formulario</Text>
                {/* <Avatar 
                    rounded
                    size="large"
                    onPress={SubirImagen}
                    source={
                        user.photoURL ? {url: photoURL} : require("a")
                    }
                /> */}
                <Avatar 
                placeholder="imagen"
                onPress={() => SubirImagen()}
                source={require("./default.webp")}
                />
                <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    
                    onChangeText={text => setNombre(text)}
                />
                <TextInput
                    placeholder="correo"
                    // autoCapitalize='none'
                    keyboardType='email-address'
                    value={correo}
                    onChangeText={text => setCorreo(text)}
                />
                <TextInput
                    placeholder="contraseña"
                    value={contrasenna}
                    onChangeText={text => setContrasenna(text)}
                    secureTextEntry={true}
                />
                
                <TextInput
                    placeholder="cconfirmacion de ontraseña"
                    value={contrasennaverificacion}
                    onChangeText={text => setContrasennaVerificacion(text)}
                    secureTextEntry={true}
                />
                <Button title="Verificar POST" onPress={handleEnviar} />
                <Button title="Petición GET" onPress={handleEnviarGet}/>
                <Button title='login' onPress={() => navigation.navigate("login")}/>
                </KeyboardAwareScrollView>
            </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 25,
        color: 'red',
    }
});