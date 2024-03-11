import { addSongToPlaylist } from './addSongToPlaylist.js';
import { displayPlaylist } from './displayPlaylist.js';
import { display } from './displaySearch.js';
document.addEventListener("DOMContentLoaded", function() {
    

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            alert('Song is remove from the playlist');
        }
    });
    
    document.getElementById('search_form').addEventListener('submit',function(event){
        var searchValue = document.getElementById('search').value;
        console.log(searchValue);
    
        if (!searchValue.trim()){
            alert('Please enter a song title or artist name.')
            event.preventDefault(); // Prevent form submission
            return false;

        }
    });

    // Search Bar
    const resultBox = document.querySelector('.result_box');
    const inputBox = document.getElementById('search');
    inputBox.onkeyup = function(){
        let input = inputBox.value.trim().toLowerCase();
        let result = [];
    
        if (input.length) {
            playlists.forEach(function(playlist) {
                let matches = playlist.list.filter(function(song) {
                    return song.toLowerCase().includes(input);
                });
                result = result.concat(matches);
            });
        }
    
        display(result, resultBox);
    };

    // Event listener for time slot change
    document.getElementById('time_slot').addEventListener('change', function(event) {
        let selectedTimeSlot = event.target.value;
        
        // Find the playlist corresponding to the selected time slot
        let currentPlaylist = playlists.find(function(playlist) {
            return playlist.time === selectedTimeSlot;
        });
        console.log(currentPlaylist)
        if (currentPlaylist) {
            displayPlaylist(currentPlaylist);
        } else {
            console.log("Playlist not found for selected time slot.");
        }
    });

    // Add event listener to "Add" buttons in search results
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add')) {
            let songName = event.target.parentNode.firstChild.textContent;
            let selectedTimeSlot = document.getElementById('time_slot').value;
            let currentPlaylist = playlists.find(function(playlist) {
                return playlist.time === selectedTimeSlot;
            });
            if (currentPlaylist) {
                alert('Song is added to the current playlist');
                addSongToPlaylist(songName, currentPlaylist);
            } else {
                console.log("Playlist not found for selected time slot.");
            }
        }
    });
    // Function to add song to current playlist
    // function addSongToPlaylist(song, currentPlaylist) {
    //     // Add song to the current playlist
    //     currentPlaylist.list.push(song);
    //     displayPlaylist(currentPlaylist);
    // }
});

let playlists = [];
const playlist1 = ["Good Morning", "Hi", "Kids", "Baby Girl", "Funky Punk"];
const playlist2 = ["Daylights", "Dreams", "Uptown Funk",
                "Flowers", "Kiss", "Stand By Me",
                "Lovin On Me", "Beautiful Things", "Saturn",
                "Snooze", "Stick Season", "Water"];
let playlistOb1 = {
    name: 'Sunny Morning',
    time: 'March 10 7:00 am',
    list: playlist1
}
let playlistOb2 ={
    name: 'Chill Vibes',
    time: 'March 10 10:00 am',
    list: playlist2

}
playlists.push(playlistOb1);
playlists.push(playlistOb2);

