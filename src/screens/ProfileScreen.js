import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {React, useEffect, useState} from 'react';
import Row from '../components/Row';
import PersonCharts from '../components/personCharts';
import PersonTastes from '../components/personTastes';
import { BottomTab } from '../components/Navigator';
import * as Spotify from '../data/Spotify'
import itemPlaylist from '../components/itemPlaylist';
import ListHistorial from '../components/listHistorial';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
let id = 1

const artistasData = [
    {
        imageUri: 'https://yt3.googleusercontent.com/ytc/APkrFKZpUktxBWFM9yWvMy82hRaLTpn8im_dPaWekiRPtA=s176-c-k-c0x00ffffff-no-rj',
        nombre: 'Rojuu',
        descripcion: '',
    },
    {
        imageUri: 'https://yt3.googleusercontent.com/ytc/APkrFKarUjQSIx2RvQjv5DNB9b95fwIYIgC-h7aMvcnz=s176-c-k-c0x00ffffff-no-rj',
        nombre: 'Charly Garcia',
        descripcion: '',
    },
    {
        imageUri: 'https://yt3.googleusercontent.com/ruwLeTIge03D7kMB5ndj-xTHNvs2ktQhAXWcmP-_PLgZCjnTC4JqLHkBIzM9IfEWnXle4WRngg=s176-c-k-c0x00ffffff-no-rj',
        nombre: 'Dillom',
        descripcion: '',
    },
];
const cancionesData = [
    {
        imageUri: 'https://i.scdn.co/image/ab67616d0000b2738de852f566517d648d849a78',
        nombre: '0800',
    },
    {
        imageUri: 'https://images.genius.com/f06aa6448bcc2d1fc34c63c1f930d4b9.1000x1000x1.jpg',
        nombre: 'Mami Issues',
    },
    {
        imageUri: 'https://yt3.googleusercontent.com/y-Owt-c51FFvVksUGLuiigdn0SFM5Dg3UY_PYlbP4FlRR1eWoMkZ3wN_pbEGCFYAqK7bbdaPglQ=s900-c-k-c0x00ffffff-no-rj',
        nombre: 'MUNDO ROTO',
    },
];
const albumesData = [
    {
        imageUri: 'https://source.boomplaymusic.com/group10/M00/04/01/bc32f99be3c9415da142c48bd135409e_320_320.jpg',
        nombre: 'Warp 5',
    },
    {
        imageUri: 'https://yt3.googleusercontent.com/y-Owt-c51FFvVksUGLuiigdn0SFM5Dg3UY_PYlbP4FlRR1eWoMkZ3wN_pbEGCFYAqK7bbdaPglQ=s900-c-k-c0x00ffffff-no-rj',
        nombre: 'MUNDO ROTO',
    },
    {
        imageUri: 'https://images.genius.com/c5bdb56fee0b7971262f852bbcdc6f35.1000x1000x1.png',
        nombre: 'Asimetría',
    },
];
const generosData = [
    {
        imageUri: 'https://cdns-images.dzcdn.net/images/artist/e8dd234df195afb7c9690b5f05e37b37/500x500.jpg',
        nombre: 'Rap',
    },
    {
        imageUri: 'https://umomag.com/wp-content/uploads/2019/10/articulo-10-artistas-clave-para-entender-el-trap-latino-duki-umomag.jpg',
        nombre: 'Trap',
    },
    {
        imageUri: 'https://yt3.googleusercontent.com/hf8kXPQU39CWamvIgApLZez_eBYLHf9FSeHJlpph2d49-hdVxdAz76eyqrYKL3ib8ZZdgyhL4w=s900-c-k-c0x00ffffff-no-rj',
        nombre: 'Hyperpop',
    },
];

const ProfileScreen = (navigation) => {
    // let data = Spotify.SpotifyRecommendations()
    const [data, setData] = useState({})
    const [userName, setUserName] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://192.168.100.57:3001/api/usuarios/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
              throw new Error('La solicitud no fue exitosaa');
            }
            const dato = await response.json()
            setUserName(dato[0].Nbr_u)
            setData(dato)
            // console.log(data);
        };
        fetchData(); // Llama a la función asincrónica para obtener los datos
      }, []);
    
    return(
        <ScrollView overScrollMode="never" style={{height: 1600}}>
        <View style={ProfileStyles.container}>
            <View style={ProfileStyles.profile}>
                    <Image source={require('../imgs/800px-Clics-modernos-charly-garcia-front.jpg')} 
                    style={ProfileStyles.profileImg}/>
                    <View style={{marginLeft: 15, marginTop: -15, width: 'auto', color: 'white'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{userName}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: 'auto', justifyContent: 'space-between'}}>
                            <Text style={{color: 'white'}}>Mood</Text>
                            <TouchableOpacity><Text style={{color: '#c4c4c4', fontSize: 14}}>Ajustes</Text></TouchableOpacity>
                        </View>
                    </View>
            </View>           
            <View>
                <View style={ProfileStyles.sectionContainer}>
                    <Text style={ProfileStyles.sectionTitle}>Historial</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <ListHistorial navigation={navigation}/>
                        <Text>{}</Text>
                    </ScrollView>
                </View>
                <View style={ProfileStyles.sectionContainer}>
                    <Text style={ProfileStyles.sectionTitle}>Listas de Reproducción</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* <itemPlaylist navigation={navigation} tituloSeccion="Canciones" data={data} /> */}
                    </ScrollView>
                </View>                
            </View>
            <View style={ProfileStyles.personalidad}>
                <Text style={{ margin: 10, fontSize: 18, fontWeight: 'bold'}}>Personalidad</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'cyan', width: '100%'}}>
                    <View style={{ width: '42%', ...ProfileStyles.caracteristicasYGustos }}>
                        <Text style={ProfileStyles.nombreSeccion}>Características</Text>
                        <PersonCharts titulo="Variabilidad musical" variabilidad={0.9} valorInicial="Estable" valorFinal="Variable"/>
                        <PersonCharts titulo="Duración promedio" variabilidad={0.6} valorInicial="principio" valorFinal="Final"/>
                        <PersonCharts titulo="Lenguaje escuchado" variabilidad={0.1} valorInicial="nativo" valorFinal="internacional"/>
                        <PersonCharts titulo="estabilidad emocional" variabilidad={0.9} valorInicial="Estable" valorFinal="Variable"/>
                    
                    </View>
                    <View style={{ width: '57%', ...ProfileStyles.caracteristicasYGustos }}>
                        <Text style={ProfileStyles.nombreSeccion}>Gustos</Text>
                        <PersonTastes titulo="Artistas favoritos" data={artistasData} />
                        <PersonTastes titulo="Canciones favoritas" data={cancionesData} />
                        <PersonTastes titulo="Albumes favoritos" data={albumesData} />
                        <PersonTastes titulo="Generos favoritos" data={generosData} />
                    </View>
                </View>
            </View>
            <View>

            </View>
        </View>
        </ScrollView>
    )
}

const ProfileStyles = StyleSheet.create({
    container:{
        alignItems: 'center'
    },
    sectionContainer: {
        width: '100%', // Ancho de cada sección
        margin: 10,
        backgroundColor: 'white', // Color de fondo
        padding: 7, // Espaciado interno
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Sombra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile:{
        flexDirection: 'row',        
        backgroundColor: 'cyan',
        width: '75%',
        height: 120,        
        padding: 7,        
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 10
    },
    profileImg:{
        width: 100, 
        height: 100,
        borderRadius: 10000,
        marginTop: -10,
    },
    personalidad:{
        height: 'auto', 
        width: '100%', 
        backgroundColor: 'blue', 
        marginHorizontal: 40, 
        alignItems: 'center',
        marginBottom: 20
    },
    nombreSeccion:{
        fontWeight: 'bold', 
        fontSize: 16, 
    },
    caracteristicasYGustos:{
        backgroundColor: 'yellow', 
        height: 300, 
        padding: 5,
        height: 'auto',
        marginBottom: 40
    },
})

export default ProfileScreen;