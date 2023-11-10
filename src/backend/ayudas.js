import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const imagenDeGaleria = async(array) => {
    const respuesta = { status: false, image: null }
const permisoCamara = await Permissions.askAsync(Permissions.CAMERA)
if(permisoCamara === "denied") {
    Alert.alert("debe darle permisos para poder subir la foto")
    return respuesta
}
const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: array
})
if(result.canceled) {
    return respuesta
}
respuesta.status = true
respuesta.image = result.url
return respuesta
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}