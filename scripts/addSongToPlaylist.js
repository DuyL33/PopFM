// Adding song to current playlist.
import { displayPlaylist } from './displayPlaylist.js';
export function addSongToPlaylist(song, currentPlaylist) {
    // Add song to the current playlist
    currentPlaylist.list.push(song);
    displayPlaylist(currentPlaylist);
}