require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

// Detect dynamic port assigned by Heroku
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "*"
};

const getFetchOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json, text/plain, */*'
    },
    keepalive: true,
    // referrerPolicy: 'no-referrer'
}

// Comic Release API Endpoint
const requestEndpoint = "https://api.shortboxed.com/comics/v1";

// ComicVine API Endpoint
const searchEndpoint = "https://comicvine.gamespot.com/api"

const apiCvKey = process.env.REACT_APP_COMIC_API_KEY;

// This function runs if the http://localhost:5000/current endpoint
// receives a HTTP GET request. API returns list of this week's
// comic releases.
app.get('/api/current', async (req, res) => {
    try {
    const response = await fetch(`${requestEndpoint}/new`);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

// This function runs if the http://localhost:5000/upcoming endpoint
// receives a HTTP GET request. API returns list of next week's
// comic releases.
app.get('/api/upcoming', async (req, res) => {
    try {
    const response = await fetch(`${requestEndpoint}/future`, getFetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

// This function runs if the http://localhost:5000/previous endpoint
// receives a HTTP GET request. API returns list of last week's
// comic releases.
app.get('/api/previous', cors(corsOptions), async (req, res) => {
    try {
    const response = await fetch(`${requestEndpoint}/previous`);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.get('/api/search/issues/:query', cors(corsOptions), async (req, res) => {
    try {
    // const fetchOptions = {
    //     method: 'GET',
    //     headers: {
    //         Connection: 'keep-alive'
    //     },
    //     referrerPolicy: 'same-origin'
    // }
    // Search Exmaple: https://comicvine.gamespot.com/api/search/?api_key=CV_KEY&format=json&sort=name:asc&resources=issue&query=%22Master%20of%20kung%20fu%22
    // const response = await fetch(`${searchEndpoint}/issues/?api_key=${apiCvKey}&filter=name:${req.params.query}&format=json`, getFetchOptions);
    const response = await fetch(`${searchEndpoint}/search/?api_key=${apiCvKey}&format=json&sort=cover_date:desc&resources=issue&query=${encodeURI(req.params.query)}`, getFetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.get('/api/search/volumes/:query', cors(corsOptions), async (req, res) => {
    try {
    // Search Exmaple: https://comicvine.gamespot.com/api/search/?api_key=CV_KEY&format=json&sort=name:asc&resources=issue&query=%22Master%20of%20kung%20fu%22
    // const response = await fetch(`${searchEndpoint}/issues/?api_key=${apiCvKey}&filter=name:${req.params.query}&format=json`, getFetchOptions);
    const response = await fetch(`${searchEndpoint}/search/?api_key=${apiCvKey}&format=json&sort=cover_date:desc&resources=volume&query=${encodeURI(req.params.query)}`, getFetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

// CLI message displayed when server is intialized
app.listen(PORT, () => {
    console.log(`Proxy app listening at http://localhost:${PORT}`);
});
