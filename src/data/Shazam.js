import axios from 'axios';

export  async function search(query) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0da5fe62c2msh1ee3f8c081ec628p1b74d6jsnd14d82b9f8e0',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }
}

export  async function getArtist(query) {
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=es-AR&offset=0&limit=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0da5fe62c2msh1ee3f8c081ec628p1b74d6jsnd14d82b9f8e0',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
        return(result);
    } catch (error) {
        console.error(error);
    }
//   console.log(response.data);
}

