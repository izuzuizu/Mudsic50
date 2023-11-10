import React, { useEffect, useState } from 'react';
import {Button} from 'react-native';
import {Audio} from 'expo-av'
import Constants from 'expo-constants'
import Item from './Item'
import { StyleSheet, Text, View, Alert, TouchableNativeFeedback, FlatList, TouchableNativeFeedbackBase } from 'react-native'
import * as Shazam from '../data/Shazam'
import * as Youtube from '../data/Youtube'
import { shadow } from 'react-native-paper';
import * as Player from '../screens/Player'
import TrackPlayer, {
    Capability,
    State,
    Event,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
  } from 'react-native-track-player';

  let songs
const Row = ({ titleSection, navigation, data }) => {
const [soundObject] = useState(new Audio.Sound());
const [status, setSatus] = useState({});
const [intervalId, setIntervalId] = useState(0);
let placeholderData = data && data.items;
const playBackState = usePlaybackState();

// console.log(Event)
const events = [
    Event.PlaybackState,
    Event.RemotePlay,
    Event.RemotePause,
    // Agrega aquí los eventos que necesites
];
useTrackPlayerEvents(events, async (event) => {
    // Aquí puedes manejar lo que sucede cuando se dispara un evento
    // Por ejemplo, puedes verificar el tipo de evento y actuar en consecuencia
    switch (event.type) {
      case Event.PlaybackState:
        // Manejar cambio de estado de reproducción
        // console.log('evento row:')
        // console.log(event.state)
        if (event.state=='playing') {
            await soundObject.unloadAsync();
        }
        if (event.state=='paused') {
            await soundObject.unloadAsync();
        }
        break;
      case Event.RemotePlay:
        // Manejar evento de reproducción remota
        // console.log('remote:')
        // console.log(event)

        break;
      case Event.RemotePause:
        // Manejar evento de pausa remota
        break;
      // Asegúrate de manejar todos los eventos a los que te suscribiste
    }
  });
  
async function Preview(url) {
    // soundObject.setOnPlaybackStatusUpdate(async previewStatus => {
    //     if (previewStatus.didJustFinish) {
    //       console.log('El audio ha terminado!');
    //       // Aquí puedes poner el código que quieres que se ejecute cuando el audio termine
    //     }
    //     // console.log(playBackState.state)
    //     if ((playBackState.state == State.Paused) || (playBackState.state == State.Ready)) {
    //     }else{
    //         await soundObject.stopAsync();
    //     }
    //   });
      
    // Para cargar y reproducir el audio
    if ((playBackState.state == State.Paused) || (playBackState.state == State.Ready)) {
        try {
            if (status.isLoaded) {
                // await soundObject.stopAsync();
                // await soundObject.unloadAsync();
            }else{
                await soundObject.loadAsync({uri: url});
            }
            if (status.isPlaying) {
                
                await soundObject.stopAsync();
                await soundObject.unloadAsync();
                await soundObject.loadAsync({uri: url});
    
            }
            if (url === null) {
                url = 'https://p.scdn.co/mp3-preview/fbef3cdacb1636624f4a3bbc2050b008414dd1d7?cid=eed31a43318f478ba48917070c9c3b37'
                // url = await search(item.name).tracks.items
            }
            await soundObject.stopAsync();
            await soundObject.setVolumeAsync(0); 
            await soundObject.playAsync();
            // // let volume = 0;
            // // const increaseVolumeInterval = setInterval(async () => {
            // // volume += 0.00005;
            // // if (volume > 0.2) {
            // //     volume = 0.2;
            // //     clearInterval(increaseVolumeInterval);
            // // }
            // await soundObject.setVolumeAsync(volume);
            // }, 100);
            await soundObject.setVolumeAsync(0.1);
            setSatus(await soundObject.getStatusAsync())
            console.log(status)
            // await soundObject.unloadAsync()
        } catch (error) {
            console.log('Error al reproducir el audio', error);
            // await soundObject.unloadAsync();      }else{
        await TrackPlayer.pause();
        setIsPlaying(false);
      }

    }
}
    return(
        <View overScrollMode='never'>
            <Text
            style={RowStyles.titleSection}
            >{titleSection}</Text>
            <FlatList overScrollMode='never'
                // data={data && data.data.tracks}
                data={placeholderData}
                horizontal={true}
                renderItem={({ item }) => {
                    switch (titleSection) {
                        case 'Artistas':
                            return(                
                                <View onStartShouldSetResponder={async ()=>{
                                        // link = await Shazam.search(item.name).artists[0];
                                    }
                                    } onTouchEnd={()=>console.log('Artista')}>
                                    {/* <Button title='a' onPress={()=>console.log('precionado')} > */}
                                    <Item key={item} img={item.images&&item.images[0]&&item.images[0].url} nombreItem={item.name} descItem={item.genres} />        
                                    {/* </Button>                 */}
                                </View>
                                )
                            break;
                        case 'Canciones':
                            
                            return(                
                                <View onStartShouldSetResponder={async ()=>{
                                    let url
                                    if (item.preview_url === null) {
                                        url = await Shazam.search(item.name)
                                        url = url.data[0].preview
                                        await Preview(url)
                                        console.log(url)

                                    }else{
                                        // console.log('no nulo')
                                        // await Preview(item.preview_url)
                                    }}} onTouchEnd={async ()=>{
                                        console.log('Cancion'); 
                                            songs = await Youtube.getSong(item.name, item.artists[0].name)
                                        setIntervalId( setInterval(async () => {
                                            let cancion= await Youtube.convertSong(songs.items[0].id.videoId)
                                            // console.log(cancion)
                                            if (cancion.msg=='in process') {
                                            }else{
                                                clearInterval(intervalId)
                                            }
                                            if (cancion.link != '') {
                                                try{
                                                    await Player.setNewSong(item.name, item.artists[0].name, item.album.images[0].url, cancion.link)
                                                    clearInterval(intervalId)
                                                }catch(error){
                                                    console.log(error)
                                                }
                                            }
                                            }, 15000));
                                        }}>
                                    <Item key={item} img={item.album.images[0].url} nombreItem={item.name} descItem={item.artists[0].name} />                        
                                </View>
                                )
                            break;
                        case 'Albumes':
                            return(
                                <View onStartShouldSetResponder={()=>console.log('Preview')} onTouchEnd={()=>console.log('Album')}>
                                    <Item key={item} img={item.images[0].url} nombreItem={item.name} descItem={item.artists.map(artist => artist.name).join(', ')} />
                                </View>
                            )
                            break;
                        default:
                            break;
                    }
                // return(
                //     <View>
                //         <Item key={item} img={item.album.images[0].url} nombreItem={item.name} descItem={item.artists[0].name} />                        
                //     </View>
                // )
            }

                }
                
            />    
        </View>  
    )
    
}

export default Row

const RowStyles = StyleSheet.create({    
    titleSection:{
        fontSize: 22,        
        color: 'white',
        marginTop: 20, 
        paddingLeft: 10,
        textTransform: 'capitalize',                        
    }
})
