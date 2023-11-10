import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import { Buffer } from 'buffer';

let genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club","comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass","dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel","goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal","hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance","j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc","metalcore","minimal-techno","movies","mpb","new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop","progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance","sad","salsa","samba","sertanejo","show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish","study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"
]
const SPOTIFY_CLIENT_ID = 'eed31a43318f478ba48917070c9c3b37';
const SPOTIFY_CLIENT_SECRET = '3337a7d23626403399901e0f1e487a98';
let token
const randomIndex = Math.floor(Math.random() * (genres.length -1));


async function getToken() {
const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({ grant_type: 'client_credentials' }),
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        });
        console.log(response.data.access_token)
        return response.data.access_token
    } catch (error) {
        console.error(error);
    }
}
export default async function SpotifySearch(query) {
    if (query == '') {
        return null;
    } else {
        let token = await getToken();
        try {
            const randomIndex = Math.floor(Math.random() * (genres.length -1));
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=album%2Cplaylist%2Cartist%2Ctrack&limit=50`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const json = await response.json();
            console.log(json);
            return json;
        } catch (error) {
            console.error(error);
        }
    }
}

