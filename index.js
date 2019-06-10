// Require packages
require('dotenv').config();
const axios = require('axios');
const express = require('express');

//server consts
const port = process.env.PORT || 3000;
const IP = process.env.IP;

//initialise express
const app = express();

//set ejs as templating engine
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/listall', async (req, res) => {
    try {
        const ticketList = await axios.get(process.env.URL, {
            auth: {
                username: process.env.EMAIL,
                password: process.env.PASSWORD
            },
            params: {
                per_page: 25
            }
        });
        console.log(ticketList.data.tickets)
        res.render('listAllTickets', {ticketList: ticketList});
    } catch (err) {
        console.log(err);
    }
})

// listAllTickets();

app.listen(port, IP, () => {
    console.log("Server Has Started...");
 });