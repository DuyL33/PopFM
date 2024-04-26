import { addSongToPlaylist } from './addSongToPlaylist.js';
import { displayPlaylist } from './displayPlaylist.js';
import { display } from './displaySearch.js';

document.addEventListener("DOMContentLoaded", function() {
    let playlists = [];
    let allSongs = [];

    // Function to fetch playlists from the server
    async function fetchPlaylists() {
        try {
            const response = await fetch('/api/playlists');
            const data = await response.json();
            playlists = data;
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    }
    // Function to fetch all songs from the server
    async function fetchAllSongs() {
        try {
            const response = await fetch('/api/songs');
            const data = await response.json();
            allSongs = data;
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    }
    fetchPlaylists();
    fetchAllSongs();

    
    document.getElementById('search_form').addEventListener('submit', function(event) {
        const searchValue = document.getElementById('search').value.trim();
        if (!searchValue) {
            alert('Please enter a song title or artist name.');
            event.preventDefault(); // Prevent form submission
            return false;
        }
    });

    const resultBox = document.querySelector('.result_box');
    const inputBox = document.getElementById('search');
    inputBox.onkeyup = function() {
        const input = inputBox.value.trim().toLowerCase();
        let result = [];

        if (input.length) {
            // Filter all songs based on the search input
            result = allSongs.filter(function(song) {
                return song.title.toLowerCase().includes(input) || song.artist.toLowerCase().includes(input);
            });
        }
        display(result, resultBox);
    };

    document.getElementById('time_slot').addEventListener('change', async function(event) {
        const selectedTimeSlot = event.target.value;
        try {
            const response = await fetch(`/api/playlists?time_slot=${selectedTimeSlot}`);            
            const playlistData = await response.json();


            if (playlistData.length > 0) {
                const selectedPlaylist = playlistData.find(playlist => playlist.time_slot === selectedTimeSlot);

                displayPlaylist(selectedPlaylist);
            } else {
                console.log("Playlist not found for selected time slot.");
            }
        } catch (error) {
            console.error('Error fetching playlist:', error);
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add')) {
            // Get the text content of the clicked element
            const songNameFull = event.target.parentNode.firstChild.textContent;
            
            // Split the song name based on the dash "-"
            const songNameParts = songNameFull.split(' - ');
    
            // Get the song name before the dash
            const songName = songNameParts[0];
            
            const selectedTimeSlot = document.getElementById('time_slot').value;
    
            console.log(selectedTimeSlot);
    
            // Find the playlist corresponding to the selected time slot
            const currentPlaylist = playlists.find(function(playlist) {
                return playlist.time_slot == selectedTimeSlot;
            });
            console.log(currentPlaylist);
            if (currentPlaylist) {
                // Find the song in allSongs array based on its name
                const songToAdd = allSongs.find(song => song.title === songName);
                if (songToAdd) {
                    alert('Song is added to the current playlist');
                    addSongToPlaylist(songToAdd, currentPlaylist);
                } else {
                    console.log("Song not found:", songName);
                }
            } else {
                console.log("Playlist not found for selected time slot:", selectedTimeSlot);
            }
        }
    });
    // Function to delete a song from the playlist
    async function deleteSongFromPlaylist(timeSlot, songName) {
        try {
            const response = await fetch(`/api/playlists/${timeSlot}/songs/${encodeURIComponent(songName)}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete song from playlist');
            }

            // Refresh the playlist display after deleting the song
            const updatedPlaylistResponse = await fetch(`/api/playlists?time_slot=${timeSlot}`);
            const updatedPlaylistData = await updatedPlaylistResponse.json();
            const updatedPlaylist = updatedPlaylistData.find(playlist => playlist.time_slot === timeSlot);

            const data = await response.json();
            //displayPlaylist(updatedPlaylist);
            displayPlaylist(data.playlist);
        } catch (error) {
            console.error('Error deleting song from playlist:', error);
        }
    }

    // Event listener for delete buttons
    document.addEventListener('click', async function(event) {
        if (event.target.classList.contains('delete')) {
            const timeSlot = document.getElementById('time_slot').value;
            console.log("time slot val", timeSlot);
            const songName = event.target.dataset.songName;

            if (!confirm(`Are you sure you want to delete "${songName}" from the playlist?`)) {
                return;
            }
            await deleteSongFromPlaylist(timeSlot, songName);
        }
    });
    
    const logoutButton = document.getElementById('logout_button');

    logoutButton.addEventListener('click', async () => {
        try {
            // Send an HTTP request to the logout endpoint
            const response = await fetch('/logout', {
                method: 'GET',
                credentials: 'same-origin' // Ensure cookies are sent with the request
            });
    
            if (response.ok) {
                // Display alert message
                alert('Logout successful');
                // Refresh the page
                location.reload();
            } else {
                console.error('Logout failed:', response.statusText);
                // Handle logout failure (e.g., display error message)
            }
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle network errors or other exceptions
        }
    });
    
});
