import express from 'express';
// import fetch from 'node-fetch';
import axios from 'axios';

const app = express();

// const fetchData = async () => {
//     const response = await fetch('https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json');
//     const data = await response.json();
//     return data;
// }

const axiosGet = async() => {
    const data = await axios({
        method: 'GET',
        url: 'https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json'
    });
    // const data = response.data;
    console.log('axiosGet / data: ', data);
    return data;
}

const fetchActivities = () => {
    axios({
        method: 'GET',
        url: 'https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json'
    }).then((response) => {
        console.log('response: ', response.data);
        return(response.data);
    })
    return {};
}

app.get('/', (req, res) => {
    res.send('Hi World!');
});

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