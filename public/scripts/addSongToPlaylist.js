import { displayPlaylist } from './displayPlaylist.js';

export async function addSongToPlaylist(song, currentPlaylist) {
    try {
        // Create a new song object with the song details
        const newSong = {
            title: song.title,
            artist: song.artist
        };

        // Send a POST request to add the new song to the playlist
        const response = await fetch(`/api/playlists/${currentPlaylist.time_slot}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        });

        if (!response.ok) {
            throw new Error('Failed to add song to playlist');
        }

        // Get the response JSON
        const data = await response.json();
        console.log("data", data.playlist);

        displayPlaylist(data.playlist);

        //return data.playlist;
        
    } catch (error) {
        console.error('Error adding song to playlist:', error);
    }
}


