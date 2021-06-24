require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

// Comic Release API Endpoint
const requestEndpoint = "https://api.shortboxed.com/comics/v1";

// ComicVine API Endpoint
const searchEndpoint = "https://www.comicvine.com/api"

const apiCvKey = process.env.REACT_APP_COMIC_API_KEY;

// This function runs if the http://localhost:5000/current endpoint
// receives a HTTP GET request. API returns list of this week's
// comic releases.
app.get('/current', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            Connection: 'keep-alive'
        },
        referrerPolicy: 'same-origin'
    }
    const response = await fetch(`${requestEndpoint}/new`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

// This function runs if the http://localhost:5000/upcoming endpoint
// receives a HTTP GET request. API returns list of next week's
// comic releases.
app.get('/upcoming', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive'
        },
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(`${requestEndpoint}/future`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

// This function runs if the http://localhost:5000/previous endpoint
// receives a HTTP GET request. API returns list of last week's
// comic releases.
app.get('/previous', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive'
        },
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(`${requestEndpoint}/previous`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.get('/search/issues/:query', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            Connection: 'keep-alive'
        },
        referrerPolicy: 'same-origin'
    }
    const response = await fetch(`${searchEndpoint}/issues/?api_key=${apiCvKey}&filter=name:${req.params.query}&format=json`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy app listening at http://localhost:${PORT}`);
});
