import {React, useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Reactions from '../components/Reactions';
import TrackPlayer,{
  Capability,
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const currentTime = '0:12'
const totalTime = '2:12'

export async function setNewSong(title, desc, imgUrl, songUrl) {
  const podcasts = {
        title: title,
        artist: desc,
        artwork: {uri: imgUrl},
        url: songUrl,
      }
      console.log(podcasts)
  let trackIndex = await TrackPlayer.getActiveTrackIndex()
  console.log(trackIndex)
  await TrackPlayer.add(podcasts, trackIndex);
  console.log('añadido')
  // await gettrackdata();
  await TrackPlayer.skipToNext();
}
const Reproductor = () => {
  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SeekTo,
          Capability.SetRating,
          Capability.SkipToPrevious
        ],
      });
      // await TrackPlayer.add(podcasts);
      // await gettrackdata();
      // await TrackPlayer.play();
    } catch (error) { console.log(error); }
  };
  useEffect(async () => {
    await setupPlayer();
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();  
  const playbackState = usePlaybackState();
    const [modalVisible, setModalVisible] = useState(false);
    const [showPositiveEmojis, setShowPositiveEmojis] = useState(true); // Estado para alternar entre emojis positivos y negativos

    const emojisPositive = ['👍', '😍', '👍', '😈', '🤣', '😄', '🥳', '😴', '👹', '🚀'];
    const emojisNegative = ['👎', '🤮', '💔', '😭', '😡', '😭'];

    const emojisToShow = showPositiveEmojis ? emojisPositive : emojisNegative;

    const toggleLikeDislike = () => {
        setShowPositiveEmojis(!showPositiveEmojis);
    };
  const progress = useProgress();
  const podcasts = [
    {
      title: 'Fix me',
      artist: 'Cuco',
      artwork: {uri: 'https://i.scdn.co/image/ab67616d0000b2735e7781138d073ea4378f6cd8'},
      url: 'https://p.scdn.co/mp3-preview/e92735f7df55454656872bed0a636a7897afa989?cid=eed31a43318f478ba48917070c9c3b37',
    },
    {
      title: 'Minimi',
      artist: 'dillom',
      artwork: {uri: 'https://i.scdn.co/image/ab67616d0000b2735e7781138d073ea4378f6cd8'},
      url: 'https://p.scdn.co/mp3-preview/e92735f7df55454656872bed0a636a7897afa989?cid=eed31a43318f478ba48917070c9c3b37',
    }
  ]
  const events = [
    Event.PlaybackState,
    Event.RemotePlay,
    Event.RemotePause,
    // Agrega aquí los eventos que necesites
  ];

useTrackPlayerEvents(events, async (event) => {
  if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
    const track = await TrackPlayer.getTrack(event.nextTrack);
    const {title, artwork, artist} = track;
    console.log(event.nextTrack);
    setTrackIndex(event.nextTrack);
    setTrackTitle(title);
    setTrackArtist(artist);
    setTrackArtwork(artwork&&artwork);
  }

    // switch (event.type) {
    //   case Event.PlaybackState:
    //     // Manejar cambio de estado de reproducción
    //     console.log('evento row:')
    //     console.log(event.state)
    //     if (event.state=='playing') {
    //       setIsPlaying(true);
    //     }
    //     if (event.state=='paused') {
    //       setIsPlaying(false);
    //     }
    //     break;
    // }
})

  // Función para iniciar el intervalo
const seekingRight = async () => {
    await TrackPlayer.pause()
    await TrackPlayer.seekTo(progress.position + 1)
    await TrackPlayer.play()
    console.log((progress.position));
    console.log((progress.position+ 1));
}
// // Función para detener el intervalo
// const stopInterval = async () => {
//   clearInterval(intervalId);
//   intervalId = null;
//   await TrackPlayer.play
// }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {title, artwork, artist} = track;
      // console.log(event.nextTrack);
      setTrackIndex(event.nextTrack);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork&&artwork);
    }
  });

  const gettrackdata = async () => {
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
      await TrackPlayer.skip(0)
    }
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
      if ((playbackState.state == State.Paused) || (playbackState.state == State.Ready)) {
        setIsPlaying(true);
        await TrackPlayer.play();
      }else{
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
      // if (playbackState === TrackPlayer.STATE_PLAYING) {
      //   // Mostrar la UI para el estado de reproducción
      //   console.log('pausa')
      // } else if (playbackState === TrackPlayer.STATE_PAUSED) {
      //   // Mostrar la UI para el estado de pausa
      // } else {
      //   // Manejar otros estados
      // }
      
    }
  };
  return (
      <View style={{
      // height: '96.5%',
      flex: 1,
      height: '100%',      
      alignItems: 'center',   
      backgroundColor: '#404040' ,
      position: 'relative',
      paddingTop: '10%'
    }}>
      {/* <ReproductorMinimizado></ReproductorMinimizado> */}
      <Text style={PlayerStyles.youAreListening}>Estás escuchando</Text>
      <Text style={PlayerStyles.list}>Nombre de la lista de reproducción</Text>
      <Image
      src={trackArtwork} 
      style={PlayerStyles.cover} />
      <Text style={PlayerStyles.nameItem}>{trackTitle}</Text>
      <Text style={PlayerStyles.descItem}>{trackArtist}</Text>
        
      <View style={PlayerStyles.timeline}> 
        {/* <Slider
          value={'position'}
          maximumValue={status.durationMillis}
          onValueChange={(value) => setPosition(value)}
        /> */}
        <Slider
            style={PlayerStyles.progressBar}
            value={progress.buffered}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor="#bbbcbd"
            maximumTrackTintColor="#fff"
            thumbTintColor="transparent"
            onSlidingComplete={async value => await TrackPlayer.seekTo(value) }></Slider>
        <Slider
          style={PlayerStyles.progressBar}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#bbbcbd"
          minimumTrackTintColor="#696969"
          maximumTrackTintColor="#424242"
          onSlidingComplete={async value => await TrackPlayer.seekTo(value) }
        ></Slider>
      </View>
        <View style={PlayerStyles.timeCont}>
        <Text style={PlayerStyles.timeNumber}>{new Date(progress.position * 1000)
                .toLocaleTimeString()
                .substring(3)}</Text>
        <Text style={PlayerStyles.timeNumber}> {new Date((progress.duration - progress.position) * 1000)
                .toLocaleTimeString()
                .substring(3)}</Text>
      </View>

      <View style={PlayerStyles.buttonsCont}>
            <TouchableOpacity style={PlayerStyles.playerIcons} onPress={() => setModalVisible(true)}>
                <FontAwesome name="smile-o" style={PlayerStyles.playerIcons}/>
                    <Reactions margBot={'36%'} margLeft={'-40%'}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    showPositiveEmojis={showPositiveEmojis}
                    toggleLikeDislike={toggleLikeDislike}
                    emojisToShow={emojisToShow}
                    />
            </TouchableOpacity>   
            <FontAwesome name="list" style={PlayerStyles.playerIcons}/>
            {/* <FontAwesome name="fast-backward" style={PlayerStyles.playerIcons}/> */}
            <TouchableOpacity onPress={previoustrack}>
                          <FontAwesome name="backward" style={PlayerStyles.playerIcons}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={togglePlayPause}>
                <FontAwesome name={isPlaying ? "pause" : "play"} style={PlayerStyles.playerIcons} />
            </TouchableOpacity>
            {/* <FontAwesome name="pause" style={PlayerStyles.playerIcons}/> */}
            <TouchableOpacity onPress={nexttrack}>
              <FontAwesome name="forward" style={PlayerStyles.playerIcons}/>
            </TouchableOpacity>
            {/* <FontAwesome name="fast-forward" style={PlayerStyles.playerIcons}/> */}
            <FontAwesome name="share" style={PlayerStyles.playerIcons}/>
            <FontAwesome name="info" style={PlayerStyles.playerIcons}/>
        </View>
    </View>
  );
};

export default Reproductor;

const PlayerStyles = StyleSheet.create({
  cover:{
    width: 280, 
    height: 280, 
    marginTop: 30, 
    borderRadius: 4,         
  },
  youAreListening:{
    marginTop: 80,
    color: '#c1c1c1',
    fontSize: 16
  },
  list:{
    fontSize: 18,
    color: '#e1e1e1',
  },
  nameItem:{
    fontSize: 20,
    color: '#f1f1f1',
  },
  descItem:{
    fontSize: 18,
    marginTop: -3,
    color: '#e5e5e5',
  },
  timeline:{
    width: '96%', 
    // position: 'absolute'
  },
  timeCont:{
    flexDirection: 'row',
    width: '96%',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: '12%'
  },
  timeNumber:{
    fontSize: 10,
    color: '#f1f1f1',
  },
  buttonsCont:{
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '12%',
    height: 50,
    marginTop: 15,
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    color: '#f1f1f1',
    alignContent: 'center',
  },
  playerIcons:{
    fontSize: 28,
    width: 40,
    height: 'auto',
    color: '#c1c1c1',
    textAlign: 'center',
    justifyContent: 'center',
},
progressBar: {
  position:'absolute',
  flex:1,
  width:'90%',
  justifyContent:'center',
  alignContent:'center',
  alignSelf: "stretch",
  marginTop: 40,
  marginLeft:'5%',
  paddingHorizontal: '12%'
}
})

