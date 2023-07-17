import express from 'express';
// import fetch from 'node-fetch';
import axios from 'axios';

import cors from 'cors';

const app = express();

const PROD_CLIENT = 'https://cae-error-finder-app-client.onrender.com';

app.get('/', (req, res) => {
    res.send('Hi World!');
});

app.use(cors({ origin: PROD_CLIENT }))
app.get('/api/activities', (req, res) => {
    axios({
        method: 'GET',
        url: 'https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json'
    }).then((response) => {
        console.log('response: ', response.data);
        res.send(response.data);
    })
})

app.listen(5000);