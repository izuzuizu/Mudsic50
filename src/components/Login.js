import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); // Definir username y setUsername como estado
    const [password, setPassword] = useState(''); // Definir password y setPassword como estado

    const handleLogin = () => {
        // Lógica de inicio de sesión
    };
    
    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={setUsername} // Actualiza el estado cuando se cambia el valor
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword} // Actualiza el estado cuando se cambia el valor
            />
           <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={styles.registro}>
                <Text style={styles.pregunta}>¿No tiene cuenta?</Text>
                <TouchableOpacity onPress={navigateToRegister}>
                    <Text style={styles.registerLink}>Regístrese</Text>
                </TouchableOpacity>
            </View>
        </View>        
    );
};

const styles = StyleSheet.create({           
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        marginTop: 45,
        justifyContent: 'flex-start',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: 'blue'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: '50%',
        textAlign: 'center'
    },
    input: {
        height: 45,
        width: '70%',
        borderRadius: 500,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginHorizontal: '15%'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 40,
        borderRadius: 5,
        width: '40%',
        marginHorizontal: '30%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center',
    },   
    pregunta:{
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 40
    }
});

export default LoginScreen;