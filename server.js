const express = require('express');
const cors = require('cors');
const YTMusic = require('ytmusic-api');

const app = express();
app.use(cors());

const ytMusicApi = new YTMusic.default();

app.get('/serachSuggestions', async (req, res) => {
    const query = req.query.q;
    try {
        await ytMusicApi.initialize().then(() => {
            ytMusicApi.getSearchSuggestions(query).then((results) => {
                res.json(results);
            })
        }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        await ytMusicApi.initialize().then(() => {
            ytMusicApi.search(query).then((results) => {
                res.json(results);
            })
        }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/searchSong', async (req, res) => {
    const query = req.query.q;
    try {
        await ytMusicApi.initialize().then(() => {
            ytMusicApi.searchSongs(query).then((results) => {
                res.json(results);
            })
        }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/discover', async (req, res) => {
    try {
        await ytMusicApi.initialize().then(() => {
            ytMusicApi.getHome().then((results) => {
                res.json(results);
            })
        }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/getStreamingUrl', async (req, res) => {
    const id = req.query.id;
    try {
        const response = await fetch(`http://localhost:8080/v1/video?url=https://www.youtube.com/watch?v=${id}&schema=url&schema=title`)
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));