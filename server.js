const express = require('express');
const path = require('path');

const Playlist = require('./models/playlistSchema');
const Song = require('./models/songSchema');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
// Configure Express to use EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.json());

app.use(express.static('public'));

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get('/dj', (req, res) => {
res.render('dj');
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});


mongoose.connect('mongodb+srv://lduyviet999:Anhem123@cluster0.ppcqqnj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/popfm', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log('Connected to MongoDB');
})
.catch((error) => {
console.error('Error connecting to MongoDB:', error);
});



app.get('/api/songs', async (req, res) => {
try {
    // Fetch all songs from the database

    const songs = await Song.find();
    res.json(songs);
} catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});
app.get('/api/playlists', async (req, res) => {
try {
    // Fetch all playlists from the database
    const playlists = await Playlist.find().populate('songs');
    console.log(playlists);
    res.json(playlists);
} catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

app.post('/api/playlists/:time_slot', async (req, res) => {
    const { time_slot } = req.params;
    const { title, artist } = req.body;

    try {
        // Find the playlist by time slot
        const playlist = await Playlist.findOne({ time_slot: time_slot }).populate('songs');

        
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Create a new song document
        const newSong = new Song({
            title,
            artist
        });

        // Save the new song to the database
        await newSong.save();

        // Add the ID of the new song to the playlist's songs array
        playlist.songs.push({
            _id: newSong._id,
            title: newSong.title,
            artist: newSong.artist
        });
        await playlist.save();

        // Return a success response
        res.json({ playlist });
    } catch (error) {
        console.error('Error adding song to playlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/playlists/:time_slot/songs/:songName', async (req, res) => {
    const { time_slot, songName } = req.params;

    try {
        // Find the playlist by its time slot
        const playlist = await Playlist.findOne({ time_slot }).populate('songs');

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Find the song in the playlist by its name
        const songToRemove = playlist.songs.find(song => song.title === songName);
        if (!songToRemove) {
            return res.status(404).json({ error: 'Song not found in the playlist' });
        }

        // Remove the song from the playlist
        playlist.songs.pull(songToRemove._id);
        await playlist.save();

        res.json({ playlist});
    } catch (error) {
        console.error('Error removing song from playlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/logout', (req, res) => {
    // Check if there's any session data to clear
    if (req.session) {
        // Destroy the session or clear session variables
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                // Handle error (e.g., send error response)
                res.status(500).json({ error: 'Internal server error' });
            } else {
                // Send a success response with a message
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } else {
        // No session data found, send a success response
        res.status(200).json({ message: 'No session to logout from' });
    }
});

