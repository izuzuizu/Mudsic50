import axios from 'axios';

    const apiKey = 'AIzaSyCVZIYMDF521pter4qDvE0fmDt2moONilw';
export  async function search(query) {
    // Construye la consulta de búsqueda
    let consulta = `${Cancion} ${artista} lyric`;
    // Codifica la consulta para usarla en una URL
    consulta = encodeURIComponent(consulta);
    // Construye la URL de la solicitud a la API de búsqueda de YouTube
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${apiKey}`;
    // Realiza la solicitud a la API de búsqueda de YouTube
    let respuesta = await fetch(url);
    return await respuesta.json();
}
export async function getSong(Cancion, artista) {
    const apiKey = 'AIzaSyCVZIYMDF521pter4qDvE0fmDt2moONilw';
    // Construye la consulta de búsqueda
    let consulta = `${Cancion} ${artista} lyric`;
    // Codifica la consulta para usarla en una URL
    consulta = encodeURIComponent(consulta);
    // Construye la URL de la solicitud a la API de búsqueda de YouTube
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${consulta}&key=${apiKey}`;
    // Realiza la solicitud a la API de búsqueda de YouTube
    let respuesta = await fetch(url);
    respuesta = await respuesta.json();    
    return respuesta
}
export async function getArtist(artist) {
    let url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${artist}&key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let uploadsId = data.items[0].contentDetails.relatedPlaylists.uploads;
            return data
            
        })
        .catch(error => console.error(error));
}
export async function getAlbums(data) {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=${data.items[0].contentDetails.relatedPlaylists.uploads}&key=${apiKey}`)
    .then(response => response.json())
    .then(data => {console.log(data); return data})
    .catch(error => console.error(error));
}

export async function convertSong(id) {
    url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0da5fe62c2msh1ee3f8c081ec628p1b74d6jsnd14d82b9f8e0',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
    }
    };
    try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    return result;
    } catch (error) {
    console.error(error);
    }
}
