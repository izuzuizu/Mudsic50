import {View, Text, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react';
import Row from '../components/Row';
import Player from './Player';
import * as Spotify from '../data/Spotify'

const HomeScreen = ({ navigation }) => {    
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchData() {
            const results = await Spotify.SpotifyRecommendations();
            setData(results);
        }
        if (Object.keys(data).length === 0) {
            fetchData();
        }
    }, [data]);


    return (
        <View>
            <ScrollView overScrollMode="never">
                <Row navigation={navigation} titleSection="Canciones" data={data} />
                {/* <Text>{}</Text> */}
            </ScrollView>
        </View>
    );
};
export default HomeScreen;

