export function displayPlaylist(playlist) {
    console.log("playlist before display", playlist);
    // Create a heading element for the playlist name
    let playlistHeading = document.createElement('p');
    playlistHeading.textContent = playlist.title;
    playlistHeading.classList.add('playlist_title'); 

    let table = document.createElement('table');
    table.className = 'table_songs';

    playlist.songs.forEach(function(song) {

        let row = document.createElement('tr');
        let songInfo = document.createElement('td');
        songInfo.className = 'song_info';
        let songName = document.createElement('h3');
        songName.textContent = song.title;
        let artistName = document.createElement('p');
        artistName.textContent = song.artist;
        songInfo.appendChild(songName);
        console.log("song name:", songName);
        songInfo.appendChild(artistName);

        let deleteButtonCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete';
        deleteButton.dataset.songName = song.title;

        
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(songInfo);
        row.appendChild(deleteButtonCell);
        table.appendChild(row);

    });
    
    // Remove existing playlist title and table if any
    let existingPlaylistHeading = document.querySelector('.playlist_title');
    let existingTable = document.querySelector('.table_songs');
    if (existingPlaylistHeading) {
        existingPlaylistHeading.parentNode.removeChild(existingPlaylistHeading);
    }
    if (existingTable) {
        existingTable.parentNode.removeChild(existingTable);
    }

    // Append new table to container
    let container = document.querySelector('.playlist_container');
    container.appendChild(playlistHeading);
    container.appendChild(table);
}
