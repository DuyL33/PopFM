// // Adding song to current playlist.
// import { displayPlaylist } from './displayPlaylist.js';
// export function addSongToPlaylist(song, currentPlaylist) {
//     // Add song to the current playlist
//     currentPlaylist.list.push(song);
//     displayPlaylist(currentPlaylist);
// }

import { displayPlaylist } from './displayPlaylist.js';

export function addSongToPlaylist(song, currentPlaylist) {
    // Create a new song object
    const newSong = {
        title: song.title,
        artist: song.artist
    };

    // Add the new song to the current playlist's songs array
    currentPlaylist.songs.push(newSong);

    // Call displayPlaylist to update the displayed playlist
    displayPlaylist(currentPlaylist);
}
