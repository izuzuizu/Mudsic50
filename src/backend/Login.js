
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon, Avatar } from 'react-native-elements';

const Login = ({navigation}) =>{
    
  const secondTextInputRef = useRef();
  const thirdTextInputRef = useRef();
  const fourthTextInputRef = useRef();

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasenna, setContrasenna] = useState('')

    const Datos = () => {
        if (!nombre || !correo || !contrasenna) {
            Alert.alert('llene los campos por favor');
            return;}
        const datos = {
            nombre: nombre,
            correo: correo,
            contrasenna: contrasenna,
        };

    fetch(`http://192.168.100.57:3001/api/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        
        
    })
    .then(response => {
        if (response.ok) {
            navigation.navigate('Navegador')
            return response.json(); // Obtener el texto de la respuesta
        } else {
            throw new Alert.alert('La solicitud no fue exitosa');
        }
    })
    // .then(result => {
    //     console.log('Respuesta del servidor:', result);
    // })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
    }

//     const EnviarPost = () => {
//         if (!nombre || !correo || !contrasenna) {
//             Alert.alert('llene los campos por favor');
//             return;}
//         const datos = {
//             nombre: nombre,
//             correo: correo,
//             contrasenna: contrasenna,
//         };
//     fetch(`http://192.168.100.57:3001/api/usuarios/correo`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             body: JSON.stringify(datos),
//         },
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Obtener el texto de la respuesta
//         } else {
//             throw new Error('La solicitud no fue exitosa');
//         }
//     })
//     .then(result => {
//         console.log('Respuesta del servidor:', result);
        
//     })
//     .catch(error => {
//         console.error('Error en la solicitud:', error);
//     });
// }

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
                {/* <Avatar 
                placeholder="imagen"
                onPress={() => SubirImagen()}
                source={require("./default.webp")}
                /> */}
                <TextInput
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={text => setNombre(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => secondTextInputRef.current.focus()}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder="correo"
                    // autoCapitalize='none'
                    ref={secondTextInputRef}
                    keyboardType='email-address'
                    value={correo}
                    onChangeText={text => setCorreo(text)}
                    returnKeyType="next"
                    onSubmitEditing={() => thirdTextInputRef.current.focus()}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder="contraseña"
                    value={contrasenna}
                    ref={thirdTextInputRef}
                    onChangeText={text => setContrasenna(text)}
                    secureTextEntry={true}
                    returnKeyType="next"
                    onSubmitEditing={() => Datos()}
                    blurOnSubmit={false}
                />
                {/* <Button title="Verificar POST" onPress={EnviarPost} /> */}
                <Button title="Iniciar" onPress={Datos}/>
                <Button title="Registrarse" onPress={()=>navigation.navigate('Register')}/>
                </KeyboardAwareScrollView>
            </View>
            </ScrollView>
        </>
    )
}
export default Login