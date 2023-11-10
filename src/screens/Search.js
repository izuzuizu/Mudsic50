import {View, Text, ScrollView, TextInput, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
import Row from '../components/Row';
import Player from './Player';
import * as Spotify from '../data/Spotify'

const Search = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState({});
    const [songs, setSongs] = useState({});
    const [artists, setArtists] = useState({});
    const [albums, setAlbums] = useState({});

    const handleSearch = async () => {
        const results = await Spotify.Search(query&&query);
        setData(results);
        setSongs(results.tracks);
        setArtists(results.artists);
        setAlbums(results.albums);
    };
    return (
        <View style={{paddingTop: 50}}>
            <TextInput style={{ backgroundColor:'gray'}} onSubmitEditing={handleSearch} onChangeText={(text) => setQuery(text)} />
            <Button title="Buscar" onPress={handleSearch} />
            <ScrollView overScrollMode="always">
                <Text>Resultados</Text>
                <Row navigation={navigation} titleSection={Object.keys(data).length !== 0 ? 'Canciones' : ''} data={songs} />
                <Row navigation={navigation} titleSection={Object.keys(data).length !== 0 ? 'Artistas' : ''} data={artists} />
                <Row navigation={navigation} titleSection={Object.keys(data).length !== 0 ? 'Albumes' : ''} data={albums} />
                {/* <Row navigation={navigation} titleSection={()=>{if (Object.keys(data).length !== 0) { return 'Artistas' }}} data={artists} />
                <Row navigation={navigation} titleSection={()=>{if (Object.keys(data).length !== 0) { return 'Albumes' }}} data={albums} /> */}
            </ScrollView>
        </View>
    );
};

export default Search;
