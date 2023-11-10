
import axios from 'axios';
import qs from 'qs';
import { Buffer } from 'buffer';

const SPOTIFY_CLIENT_ID = 'eed31a43318f478ba48917070c9c3b37';
const SPOTIFY_CLIENT_SECRET = '3337a7d23626403399901e0f1e487a98';
export async function getToken() {
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