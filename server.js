const express = require('express');
const path = require('path');

const Playlist = require('./models/playlistSchema');
const Song = require('./models/songSchema');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.post('/api/songs', async (req, res) => {
    try {
        // Extract song data from the request body
        const { title, artist } = req.body;

        // Create a new song document
        const newSong = new Song({ title, artist });

        // Save the new song document to the database
        const savedSong = await newSong.save();

        res.status(201).json(savedSong);
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// // Define a route to fetch playlists
// app.get('/api/playlists', async (req, res) => {
//     try {
//         // Fetch all playlists from the database
//         const playlists = await Playlist.find({}).populate('songs');
//         res.json(playlists);
//     } catch (error) {
//         console.error('Error fetching playlists:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// Define a route to fetch playlists by time slot
app.get('/api/playlists', async (req, res) => {
    try {
        const { time_slot } = req.query;
        // Fetch playlists from the database that match the given time slot
        const playlists = await Playlist.find({ time_slot }).populate('songs');
        res.json(playlists);
    } catch (error) {
        console.error('Error fetching playlists:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

