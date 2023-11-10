import {React, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Reactions from './Reactions';
import TrackPlayer, { 
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const ReproductorMinimizado = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPositiveEmojis, setShowPositiveEmojis] = useState(true); // Estado para alternar entre emojis positivos y negativos

    const emojisPositive = ['👍', '😍', '👍', '😈', '🤣', '😄', '🥳', '😴', '👹', '🚀'];
    const emojisNegative = ['👎', '🤮', '💔', '😭', '😡', '😭'];

    const emojisToShow = showPositiveEmojis ? emojisPositive : emojisNegative;

    const toggleLikeDislike = () => {
        setShowPositiveEmojis(!showPositiveEmojis);
    };
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();  
  const playBackState = usePlaybackState();
  const progress = useProgress();
    const [isPlaying, setIsPlaying] = useState(false);
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
                setIsPlaying(true);
                await gettrackdata()
            }
            if (event.state=='paused') {
                setIsPlaying(false);

            }
            break;
        }
    })
    const getQueue = async () => {
        const queue = await TrackPlayer.getQueue();
        console.log(queue);
      };      
    const gettrackdata = async () => {
        // TrackPlayer.addEventListener('playback-state', (state) => {console.log(state)})
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        console.log(trackIndex);
        console.log(trackObject);
        setTrackIndex(trackIndex);
        setTrackTitle(trackObject.title);
        setTrackArtist(trackObject.artist);
        setTrackArtwork(trackObject.artwork);
      };
    
    const nexttrack = async () => {
        if (trackIndex < trackIndex-1) {
          await TrackPlayer.skipToNext();
          await gettrackdata();
          // await gettrackdata();
          await TrackPlayer.play()
        }else{
          await TrackPlayer.skip(1)
        }
      await getQueue();

        ;
      };
    
      const previoustrack = async () => {
          if (progress.position<5) {
            if (trackIndex > 0) {
                await TrackPlayer.skipToPrevious();
                await gettrackdata();
                await TrackPlayer.play()
            };
          }else{
            TrackPlayer.seekTo(0)
          }
          // console.log(progress)
      };
    
    const togglePlayPause = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack != null) {
            if ((playBackState.state == State.Paused) || (playBackState.state == State.Ready)) {
            setIsPlaying(true);
            await TrackPlayer.play();
            }else{
            await TrackPlayer.pause();
            setIsPlaying(false);
            }
      await getQueue();

        }
    };
    return (
    <View style={PlayerStyles.container}>
        <View style={PlayerStyles.left}>
            <Image
                src={trackArtwork} 
                style={{ 
                    height: 50,
                    width: 50
                }}
            />
            <View>
                <View style={{                
                    alignItems: 'start',
                    paddingHorizontal: 7,                                    
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: 'white'
                    }}>{trackTitle}</Text>
                    <Text style={{
                        fontSize: 9,
                        color: 'white'
                    }}>{trackArtist}</Text>
                </View> 
            </View>
        </View>        
            <TouchableOpacity onPress={() => setModalVisible(true)} style={PlayerStyles.center}>
                <FontAwesome name="smile-o" style={{ fontSize: 35, color: '#c1c1c1' }} />
            </TouchableOpacity>

            <Reactions margBot={'16.7%'} margLeft={'0%'}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                showPositiveEmojis={showPositiveEmojis}
                toggleLikeDislike={toggleLikeDislike}
                emojisToShow={emojisToShow}
            />
        <View style={PlayerStyles.right}>
        <TouchableOpacity onPress={previoustrack}>
            <FontAwesome name="fast-backward" style={PlayerStyles.playerIcons}/>
        </TouchableOpacity>

            {/* <FontAwesome name="backward" style={PlayerStyles.playerIcons}/> */}
            <TouchableOpacity onPress={togglePlayPause}>
                <FontAwesome name={isPlaying ? "pause" : "play"} style={PlayerStyles.playerIcons} />
            </TouchableOpacity>
            {/* <FontAwesome name="forward" style={PlayerStyles.playerIcons}/> */}
        <TouchableOpacity onPress={nexttrack}>

            <FontAwesome name="fast-forward" style={PlayerStyles.playerIcons}/>
        </TouchableOpacity>
        </View>
    </View> 
  );
};

export default ReproductorMinimizado;

const PlayerStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        backgroundColor: '#404040',
        borderTopWidth: 1,
        borderColor: '#666666',
        width: '100%',
        height: 57,
    },
    left: {
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'start',
        paddingLeft: '3%',
        alignItems: 'center',
    },
    center: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingTop: 3,
        color: 'white',
        height: 'auto'
    },
    playerIcons: {
        fontSize: 25,
        width: 30,
        height: 30,            
        textAlign: 'center',
        color: '#c1c1c1',        
    },
    emojiToggleContainer: {
        alignItems: 'center',
        marginVertical: 7,
        flexDirection: 'row',
        width: 120,
        height: 50,
        borderRadius: 200,
        justifyContent: 'space-between',
    },
    emojiToggleText: {
        padding: 10,
        fontSize: 18,
        color: 'white', // Cambia el color del texto al seleccionar
        textAlign: 'center',
        justifyContent: 'center',        
    }, 
    activeEmoji: {
        borderRadius: 200,
        padding: 10,
        elevation: 5,
        color: 'white', // Cambia el color del texto al seleccionar
    },  
    flatList:{
        backgroundColor: 'black',
        display: 'flex',
        paddingHorizontal: 7,
        paddingVertical: 5,
        width: '100%'
    },
    item:{
        width: 40,
        height: 40,
        backgroundColor: 'cyan',
        margin: '1.8%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemEmoji:{
        fontSize: 17,
    },
});
