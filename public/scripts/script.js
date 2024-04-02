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
            const response = await fetch('/api/songs'); // Assuming this endpoint returns all songs
            const data = await response.json();
            allSongs = data;
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    }
    fetchAllSongs();
    fetchPlaylists();

    console.log(playlists);
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            alert('Song is removed from the playlist');
        }
    });
    
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
            console.log(selectedTimeSlot);
            console.log(response);
            const playlistData = await response.json();
            console.log(response.json);
            if (playlistData.length > 0) {
                const selectedPlaylist = playlistData[0];
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
            const songName = event.target.parentNode.firstChild.textContent;
            const selectedTimeSlot = document.getElementById('time_slot').value;
            
            // Find the playlist corresponding to the selected time slot
            const currentPlaylist = playlists.find(function(playlist) {
                return playlist.time_slot === selectedTimeSlot;
            });
            console.log(currentPlaylist);
            if (currentPlaylist) {
                // Find the song in allSongs array based on its name
                const songToAdd = allSongs.find(song => song.title === songName);
                if (songToAdd) {
                    alert('Song is added to the current playlist');
                    // Assuming addSongToPlaylist function adds the song to the current playlist
                    addSongToPlaylist(songToAdd, currentPlaylist);
                } else {
                    console.log("Song not found:", songName);
                }
            } else {
                console.log("Playlist not found for selected time slot:", selectedTimeSlot);
            }
        }
    });
    
});
