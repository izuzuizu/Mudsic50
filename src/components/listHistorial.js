import {React, useEffect, useState} from 'react'
import Constants from 'expo-constants'
import Item from './Item'
import ItemHistorial from './ItemHistorial'
import { StyleSheet, Text, View, Alert, TouchableNativeFeedback, FlatList, TouchableNativeFeedbackBase } from 'react-native'


let id = 1
const ListHistorial = ({ navigation}) => {
const [placeholderData, setPlaceholderData] = useState({});

useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`http://192.168.100.57:3001/api/historial/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
          throw new Error('La solicitud no fue exitosaa');
        }
        const data = await response.json();
        data.forEach(async element => {
            if(element.tipo == "Cancion"){
                    const response1 = await fetch(`http://192.168.100.57:3001/api/canciones/${element.nombre}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (!response1.ok) {
                    throw new Error('La solicitud no fue exitosaa');
                    }
                    const song = await response1.json();
                        const response2 = await fetch(`http://192.168.100.57:3001/api/albumes/${song[0].album}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                        if (!response2.ok) {
                        throw new Error('La solicitud no fue exitosaa');
                        }
                        const album = await response2.json();
                // console.log(album[0].imgAlbum)

                        element.img = album[0].imgAlbum;
            }
            if(element.tipo == "Artista"){
                // console.log(element)
                    const response1 = await fetch(`http://192.168.100.57:3001/api/artistas/${element.nombre}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (!response1.ok) {
                        throw new Error('La solicitud no fue exitoosaa');
                    }
                    const artist = await response1.json();
                    // console.log(response1)
                    element.img = artist[0].imgArtista;
            }
            if(element.tipo == "Album"){
                // console.log(element)
                    const response1 = await fetch(`http://192.168.100.57:3001/api/albumes/${element.nombre}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    if (!response1.ok) {
                        throw new Error('La solicitud no fue exitoosaa');
                    }
                    const album = await response1.json();
                    console.log(album)
                    // element.img = album && album.imgAlbum;
            }
        });
        setPlaceholderData(data)
    };

    fetchData(); // Llama a la función asincrónica para obtener los datos
  }, []);
    return(
        <View overScrollMode='never'>            
            <FlatList overScrollMode='never'
                // data={data && data.data.tracks}
                data={placeholderData}
                horizontal={true}
                renderItem={({ item }) => (
                    <View>
                        <ItemHistorial key={item} img={item.img} nombreItem={item.nombre} descItem={item.tipo} />                        
                    </View>
                )}
            />    
        </View>  
    )
    
}

export default ListHistorial

const listStyle = StyleSheet.create({    
    titleSection:{
        fontSize: 22,
        backgroundColor: 'black',
        color: 'white',        
        paddingLeft: 10,
        borderRadius: 3,
        textTransform: 'capitalize' 
    }
})